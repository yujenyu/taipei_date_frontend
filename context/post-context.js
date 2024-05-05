import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { io } from 'socket.io-client';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { auth, getAuthHeader } = useAuth();

  const [posts, setPosts] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postPage, setPostPage] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [eventPageCard, setEventPageCard] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [randomPosts, setRandomPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [postCreated, setPostCreated] = useState(false); // 標示貼文是否已創建
  const [postId, setPostId] = useState(''); // 儲存創立貼文後的 post id

  const [selectedFile, setSelectedFile] = useState(null); // 選中的檔案
  const [previewUrl, setPreviewUrl] = useState(''); // 預覽圖片(呼叫URL.createObjectURL得到的網址)

  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [events, setEvents] = useState([]);
  const [minDate, setMinDate] = useState(''); // 建立event 當下時間紀錄
  const [minEndDate, setMinEndDate] = useState(minDate); // 活動結束日期必須大於等於開始日期
  const [eventCreated, setEventCreated] = useState(false); // 標示活動是否已創建
  const [eventId, setEventId] = useState(''); // 儲存創立貼文後的 event id
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    status: 'upcoming',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const [indexHasMore, setIndexHasMore] = useState(true);
  const [indexFilteredHasMore, setIndexFilteredHasMore] = useState(true);
  const [exploreHasMore, setExploreHasMore] = useState(true);
  const [profileHasMore, setProfileHasMore] = useState(true);
  const [userProfileHasMore, setUserProfileHasMore] = useState(true);
  const [eventHasMore, setEventHasMore] = useState(true);
  const [commentHasMore, setCommentHasMore] = useState(true);

  const [page, setPage] = useState(1);
  const [profilePage, setProfilePage] = useState(1);
  const [filteredPage, setFilteredPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [randomPage, setRandomPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

  const [attendedEvents, setAttendedEvents] = useState({});
  const [following, setFollowing] = useState({});
  const [postModalToggle, setPostModalToggle] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isHoverActive, setIsHoverActive] = useState(true);
  const [activeFilterButton, setActiveFilterButton] = useState('');
  const [reload, setReload] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const fileInputRef = useRef(null);
  const createModalRef = useRef(null);
  const createModalMobileRef = useRef(null);
  const createEventModalRef = useRef(null);
  const createEventModalMobileRef = useRef(null);
  const searchModalRef = useRef(null);
  const searchModalMobileRef = useRef(null);
  const followerModalRef = useRef(null);
  const followingModalRef = useRef(null);

  const router = useRouter();
  const { uid } = router.query;

  const [socket, setSocket] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const getUserDetail = async () => {
    if (!auth.id) return;

    try {
      const res = await fetch(
        `http://localhost:3001/community/get-userInfo/${auth.id}`
      );
      const data = await res.json();
      // 確保即使 data[0] 為 undefined，也能安全地設置一個空對象
      setUserInfo(data[0] || {});
    } catch (error) {
      console.error('Failed to fetch user info', error);
      setUserInfo({}); // 當請求失敗時，也設置一個空對象
    }
  };

  const getCommunityIndexPost = async () => {
    if (!indexHasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setIndexHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const postIds = data.map((post) => post.post_id).join(',');

        await checkPostsStatus(postIds); // 檢查貼文狀態
        await getPostComments(postIds);

        setPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getCommunityIndexFilteredPost = async (keyword) => {
    if (!indexFilteredHasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/get-posts-by-keyword?keyword=${keyword}&page=${filteredPage}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setIndexFilteredHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const postIds = data.map((post) => post.post_id).join(',');

        await checkPostsStatus(postIds); // 檢查貼文狀態
        await getPostComments(postIds);

        setFilteredPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setFilteredPage((prevPage) => prevPage + 1); // 更新頁碼
        setIsFilterActive(true);
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getCommunityExplorePost = async () => {
    if (!exploreHasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/get-random-posts?page=${randomPage}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setExploreHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const postIds = data.map((post) => post.post_id).join(',');

        await checkPostsStatus(postIds); // 檢查貼文狀態
        await getPostComments(postIds);

        setRandomPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setRandomPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch explore posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getCommunityProfilePost = async () => {
    if (!profileHasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載
    try {
      const res = await fetch(
        `http://localhost:3001/community/posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setProfileHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const postIds = data.map((post) => post.post_id).join(',');

        await checkPostsStatus(postIds); // 檢查貼文狀態
        await getPostComments(postIds);

        setProfilePosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch profile posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getPostPage = async (pid) => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-post-page/${pid}`
      );
      const data = await res.json();
      if (data.length !== 0) {
        await checkPostsStatus(pid); // 檢查貼文狀態
        await getPostComments(pid);

        setPostPage(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getEventPage = async (eid) => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-event-page/${eid}`
      );
      const data = await res.json();
      if (data.length !== 0) {
        await checkEventsStatus(eid); // 檢查活動狀態

        setEventPageCard(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getCommunityEvents = async () => {
    if (!eventHasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/events?page=${eventPage}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setEventHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const eventIds = data.map((event) => event.comm_event_id).join(',');

        await checkEventsStatus(eventIds); // 檢查活動狀態

        setEvents((prevEvents) => [...prevEvents, ...data]); // 更新posts狀態
        setEventPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getPostComments = async (postIds) => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-comments?postIds=${postIds}`
      );
      const data = await res.json();

      // 將評論數據按 post_id 分類
      const commentsByPostId = data.reduce((accumulator, comment) => {
        // 從每個評論中解構出 post_id
        const { post_id } = comment;
        // 如果累積器（accumulator）中尚未有這個 post_id 的鍵，則初始化為空陣列, 以確保後面可以將評論推送到這個陣列中
        if (!accumulator[post_id]) {
          accumulator[post_id] = [];
        }
        // 將當前的評論對象推送到對應 post_id 的陣列中
        accumulator[post_id].push(comment);
        // 返回更新後的累積器物件，供 reduce 函數的下一次迭代使用
        return accumulator;
      }, {}); // 初始值為一個空物件，這是 reduce 函數建立物件累積的起點

      // 更新評論狀態，結合新載入的評論數據
      setComments((prevComments) => {
        // 創建一個新的物件來存放更新後的評論數據，這個物件是基於先前的評論狀態（prevComments）的副本
        const updatedComments = { ...prevComments };

        // 遍歷每個postId對應的新評論列表
        for (const postId in commentsByPostId) {
          // 直接用新載入的評論數據替換掉原有的評論數據
          updatedComments[postId] = commentsByPostId[postId];
        }

        // 返回更新後的評論物件，這個操作將觸發React的狀態更新，導致相關組件根據新的評論數據重新渲染
        return updatedComments;
      });

      if (data.length === 0) {
        setCommentHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  // 上傳回覆
  const handleCommentUpload = async (post, newComment) => {
    const postId = post.post_id;
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/add-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({
          context: newComment,
          status: 'posted',
          postId,
          userId,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setComments((prevComments) => {
          // 從先前的評論狀態（prevComments）創建一個新的物件副本。
          const updatedComments = { ...prevComments };

          // 獲取指定貼文ID（post_id）的評論列表。如果這個貼文沒有評論，則創建一個空陣列來儲存新評論。
          const commentsForPost = updatedComments[postId] || [];

          // 將新的評論數據（data，剛從後端API獲得的評論對象）添加到該貼文的評論列表中。
          updatedComments[postId] = [...commentsForPost, data];

          // 返回更新後的評論狀態物件，觸發相關組件的重新渲染，在界面上顯示包括新評論在內的更新後的評論列表。
          return updatedComments;
        });

        getPostComments(postId);

        // 將狀態 newComment 更新為空字串，清空 textarea
        setNewComment('');
      } else {
        throw new Error(data.message || '新增回覆失敗');
      }
    } catch (error) {
      console.error('upload comment failed:', error);
    } finally {
      // 清空textarea
      setNewComment(''); // 清空 textarea
    }
  };

  const getSearchUsers = async (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // 確保空字串不會觸發
    if (value.trim()) {
      try {
        const response = await fetch(
          `http://localhost:3001/community/search-users?searchTerm=${value}`
        );
        const data = await response.json();
        setSearchResults(data);
        setHasSearched(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  // 重置搜尋內容並關閉視窗
  const resetAndCloseSearchModal = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
    setProfilePage(1);
    // setProfilePosts([]);
  };

  // 重置內容並關閉視窗
  const resetAndCloseFollowerModal = () => {
    setProfilePage(1);
    // setProfilePosts([]);
  };

  // 重置內容並關閉視窗
  const resetAndCloseFollowingModal = () => {
    setProfilePage(1);
    // setProfilePosts([]);
  };

  // 選擇檔案有變動時的處理函式
  const handleFileChange = (e) => {
    // 取得檔案，只取第一個檔案
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // 檔案有變時設定回初始值
      setPreviewUrl('');
    } else {
      setSelectedFile(null);
      // 檔案有變時設定回初始值
      setPreviewUrl('');
    }
  };

  // 重置選取內容並關閉視窗
  const resetAndCloseModal = () => {
    setSelectedFile(null);
    setPreviewUrl('');

    if (createModalRef.current) {
      createModalRef.current.close();
    }
    if (createModalMobileRef.current) {
      createModalMobileRef.current.close();
    }
    if (createEventModalRef.current) {
      createEventModalRef.current.close();
    }
    if (createEventModalMobileRef.current) {
      createEventModalMobileRef.current.close();
    }
    // if (editModalRef.current) {
    //   editModalRef.current.close();
    // }
  };

  // 重置篩選
  const handleFilterClick = (keyword) => {
    // reset
    setFilteredPosts([]);
    setFilteredPage(1);

    setCurrentKeyword(keyword);
    setActiveFilterButton(keyword);
    setIsFilterActive(true);
  };

  // 觸發隱藏的 file input 點擊事件
  const handleFilePicker = () => {
    // 利用 ref 引用來觸發 input 的點擊事件
    fileInputRef.current?.click();
  };

  // 重置貼文狀態
  const resetPostState = () => {
    setPostId('');
    setPostCreated(false);
  };

  // 上傳貼文
  const handlePostUpload = async () => {
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    // if (!postContent) {
    //   createModalRef.current.close();
    //   createModalMobileRef.current.close();
    //   Swal.fire({
    //     title: '請輸入貼文內容!',
    //     icon: 'warning',
    //     confirmButtonText: '關閉',
    //     confirmButtonColor: '#A0FF1F',
    //     background: 'rgba(0, 0, 0, 0.85)',
    //   });
    //   return;
    // }

    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ context: postContent, userId }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostId(data.post.post_id);
        setPostCreated(true);
        return data.post.post_id; // 返回 postId 給 handleFileUpload
      } else {
        throw new Error(data.message || '新增貼文失敗');
      }
    } catch (error) {
      console.error('upload post failed:', error);
      createModalRef.current.close();
      createModalMobileRef.current.close();

      Swal.fire({
        title: '分享失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  // 上傳圖片到伺服器
  const handleFileUpload = async () => {
    let currentPostId = postId;

    if (!postCreated) {
      currentPostId = await handlePostUpload();
      if (!currentPostId) {
        console.error('No post ID returned');
        return; // 如果新增貼文失敗或沒有 postID 則停止執行
      }
      setPostId(currentPostId);
      setPostCreated(true);
    }

    const fd = new FormData();

    // 對照server上要獲取的檔案名稱(req.files.photo)
    fd.append('photo', selectedFile);
    fd.append('postId', currentPostId);

    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/upload-photo', {
        method: 'POST',
        body: fd,
        headers: { ...getAuthHeader() },
      });

      const data = await res.json();

      if (res.ok) {
        // 更新貼文以觸發刷新頁面 !!!Important!!!
        setPosts((prevPosts) => [data.post, ...prevPosts]);
        setProfilePosts((prevPosts) => [data.post, ...prevPosts]);
        setFilteredPosts((prevPosts) => [data.post, ...prevPosts]);
        setRandomPosts((prevPosts) => [data.post, ...prevPosts]);
        setPostPage((prevPosts) => [
          data.post,
          ...(Array.isArray(prevPosts) ? prevPosts : []),
        ]);
        setPostsCount((prevCount) => prevCount + 1); // 增加貼文數量
      } else {
        throw new Error('Network response was not ok.');
      }

      // 關閉 create modal
      createModalRef.current.close();
      createModalMobileRef.current.close();

      Swal.fire({
        title: '分享成功!',
        icon: 'success',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
          resetPostState();
        }
      });
    } catch (error) {
      console.error('upload failed:', error);
      createModalRef.current.close();
      createModalMobileRef.current.close();

      Swal.fire({
        title: '分享失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  const handlePostUpdate = async (post, localPostContext, editModalRef) => {
    const postId = post.post_id;
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    // if (!localPostContext) {
    //   Swal.fire({
    //     title: '請輸入貼文內容!',
    //     icon: 'warning',
    //     confirmButtonText: '關閉',
    //     confirmButtonColor: '#A0FF1F',
    //     background: 'rgba(0, 0, 0, 0.85)',
    //   });
    //   return;
    // }

    try {
      const res = await fetch('http://localhost:3001/community/edit-post', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ context: localPostContext, postId }), // 將對象轉換為JSON字符串
      });

      const data = await res.json();

      if (res.ok) {
        // 更新狀態中的貼文 !!!Important
        setPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );
        setFilteredPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );
        setProfilePosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );
        setRandomPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );

        // 更新 post page 單筆資料
        if (postPage.post_id === postId) {
          setPostPage({ ...postPage, ...data.post });
        }
      } else {
        throw new Error(data.message || '編輯貼文失敗');
      }

      // 貼文更新成功，檢查是否有檔案要上傳
      if (selectedFile) {
        await updatePostPhotoUpdate(postId, editModalRef);
      }

      // 關閉 edit modal
      editModalRef.current.close();

      Swal.fire({
        title: '編輯成功!',
        icon: 'success',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    } catch (error) {
      console.error('Failed to update the post:', error);

      // 關閉 edit modal
      editModalRef.current.close();

      Swal.fire({
        title: '編輯失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  // 處理照片更新
  const updatePostPhotoUpdate = async (postId, editModalRef) => {
    try {
      const fd = new FormData();

      fd.append('photo', selectedFile);
      fd.append('postId', postId);

      const res = await fetch(
        'http://localhost:3001/community/edit-post-photo',
        {
          method: 'PUT',
          body: fd,
          headers: {
            ...getAuthHeader(),
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        // 更新狀態中的貼文 !!!Important
        setPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );
        setFilteredPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );
        setProfilePosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );
        setRandomPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.post_id === postId) {
              return { ...p, ...data.post }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return p;
          })
        );

        // 更新 post page 單筆資料
        if (postPage.post_id === postId) {
          setPostPage({ ...postPage, ...data.post });
        }
      } else {
        throw new Error('Network response was not ok.');
      }

      // 關閉 edit modal
      editModalRef.current.close();

      Swal.fire({
        title: '分享成功!',
        icon: 'success',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
          resetPostState();
        }
      });
    } catch (error) {
      console.error('upload failed:', error);
      // 關閉 edit modal
      editModalRef.current.close();

      Swal.fire({
        title: '更新照片失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  const handleEventUpdate = async (
    event,
    localEventDetails,
    editEventModalRef
  ) => {
    const eventId = event.comm_event_id;
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    if (!localEventDetails) {
      Swal.fire({
        title: '請輸入活動內容!',
        icon: 'warning',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      });
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/community/edit-event', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          ...localEventDetails,
          status: 'upcoming',
          eventId,
        }), // 將對象轉換為JSON字符串
      });

      const data = await res.json();

      if (res.ok) {
        setEvents((prevEvents) =>
          prevEvents.map((e) => {
            if (e.comm_event_id === eventId) {
              return { ...e, ...data.event }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
            }
            return e;
          })
        );

        // 更新 event page card 單筆資料
        if (eventPageCard.comm_event_id === eventId) {
          setEventPageCard({ ...eventPageCard, ...data.event });
        }
      } else {
        throw new Error(data.message || '編輯活動失敗');
      }

      // 活動更新成功，檢查是否有檔案要上傳
      if (selectedFile) {
        try {
          const fd = new FormData();

          fd.append('photo', selectedFile);
          fd.append('eventId', eventId);

          const res = await fetch(
            'http://localhost:3001/community/edit-event-photo',
            {
              method: 'PUT',
              body: fd,
              headers: {
                ...getAuthHeader(),
              },
            }
          );

          const data = await res.json();

          if (res.ok) {
            // 更新活動以觸發刷新頁面 !!!Important!!!
            // setEvents((prevEvents) => [data.event, ...prevEvents]);
            setEvents((prevEvents) =>
              prevEvents.map((e) => {
                if (e.comm_event_id === eventId) {
                  return { ...e, ...data.event }; // 使用來自 API 回應的 data.post 作為更新後資料的來源
                }
                return e;
              })
            );

            // 更新 event page card 單筆資料
            if (eventPageCard.comm_event_id === eventId) {
              setEventPageCard({ ...eventPageCard, ...data.event });
            }
          } else {
            throw new Error('Network response was not ok.');
          }

          // 關閉 edit event modal
          editEventModalRef.current.close();

          Swal.fire({
            title: '分享成功!',
            icon: 'success',
            confirmButtonText: '關閉',
            confirmButtonColor: '#A0FF1F',
            background: 'rgba(0, 0, 0, 0.85)',
          }).then((result) => {
            if (result.isConfirmed) {
              resetAndCloseModal();
              resetPostState();
            }
          });
        } catch (error) {
          console.error('upload failed:', error);
          createModalRef.current.close();
          createModalMobileRef.current.close();

          Swal.fire({
            title: '更新照片失敗!',
            icon: 'error',
            confirmButtonText: '關閉',
            confirmButtonColor: '#A0FF1F',
            background: 'rgba(0, 0, 0, 0.85)',
          }).then((result) => {
            if (result.isConfirmed) {
              resetAndCloseModal();
            }
          });
        }
      }

      // 關閉 edit event modal
      editEventModalRef.current.close();

      Swal.fire({
        title: '編輯成功!',
        icon: 'success',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    } catch (error) {
      console.error('Failed to update the post:', error);

      editEventModalRef.current.close();

      Swal.fire({
        title: '編輯失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  const handleLikedClick = async (post) => {
    const postId = post.post_id;
    const userId = auth.id;

    if (userId === 0) {
      return;
    }
    const wasLiked = likedPosts[postId] || false;
    const newLikedState = !wasLiked;

    try {
      const url = wasLiked ? 'unlike-post' : 'like-post';
      const res = await fetch(`http://localhost:3001/community/${url}`, {
        method: wasLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ postId, userId }),
      });
      if (res.ok) {
        setLikedPosts((prev) => ({ ...prev, [postId]: newLikedState }));
      } else {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleAttendedClick = async (event) => {
    const eventId = event.comm_event_id;
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    const wasAttended = attendedEvents[eventId] || false;
    const newAttendedState = !wasAttended;

    try {
      const url = wasAttended ? 'notattend-event' : 'attend-event';
      const res = await fetch(`http://localhost:3001/community/${url}`, {
        method: wasAttended ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ eventId, userId }),
      });
      if (res.ok) {
        setAttendedEvents((prev) => ({
          ...prev,
          [eventId]: newAttendedState,
        }));
      } else {
        throw new Error('Failed to update attendance status');
      }
    } catch (error) {
      console.error('Error updating event attendance:', error);
    }
  };

  const handleSavedClick = async (post) => {
    const postId = post.post_id;
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    const wasSaved = savedPosts[postId] || false;
    const newSavedState = !wasSaved;

    try {
      const url = wasSaved ? 'unsave-post' : 'save-post';
      const res = await fetch(`http://localhost:3001/community/${url}`, {
        method: wasSaved ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ postId, userId }),
      });
      if (res.ok) {
        setSavedPosts((prev) => ({ ...prev, [postId]: newSavedState }));
      } else {
        throw new Error('Failed to update save status');
      }
    } catch (error) {
      console.error('Error updating save status:', error);
    }
  };

  const handleFollowClick = async (FollowingId) => {
    const userId = auth.id; // 當前登入用戶的ID

    if (userId === 0) return; // 未登入狀態直接返回

    const isFollowing = following[FollowingId] || false; // 檢查是否已追蹤該用戶
    const newFollowingState = !isFollowing; // 新的追蹤狀態為當前狀態的反向值

    try {
      const url = isFollowing ? 'unfollow' : 'follow';
      const res = await fetch(`http://localhost:3001/community/${url}`, {
        method: isFollowing ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ userId, FollowingId }),
      });

      if (res.ok) {
        setFollowing((prev) => ({
          ...prev,
          [FollowingId]: newFollowingState,
        }));
      } else {
        throw new Error('Failed to update follow status');
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  const handleDeletePostClick = async (post) => {
    const postId = post.post_id;

    if (!postId) return;

    Swal.fire({
      title: '確定刪除?',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: `取消`,
      confirmButtonColor: '#A0FF1F',
      background: 'rgba(0, 0, 0, 0.85)',
    }).then(async (result) => {
      // 如果點擊確認刪除才執行
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:3001/community/delete-post`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
              },
              body: JSON.stringify({ postId }),
            }
          );

          if (res.ok) {
            // 更新 posts, randomPosts 狀態以移除已刪除的貼文
            setPosts((prevPosts) => {
              return prevPosts.filter((post) => post.post_id !== postId);
            });
            setProfilePosts((prevPosts) => {
              return prevPosts.filter((post) => post.post_id !== postId);
            });
            setFilteredPosts((prevPosts) => {
              return prevPosts.filter((post) => post.post_id !== postId);
            });
            setRandomPosts((prevPosts) => {
              return prevPosts.filter((post) => post.post_id !== postId);
            });
            setPostPage((prevPosts) => {
              return prevPosts.filter((post) => post.post_id !== postId);
            });

            setPostsCount((prevCount) => prevCount - 1); // 減少貼文數量

            Swal.fire({
              title: '刪除成功!',
              icon: 'success',
              confirmButtonText: '關閉',
              confirmButtonColor: '#A0FF1F',
              background: 'rgba(0, 0, 0, 0.85)',
            });
          } else {
            Swal.fire({
              title: '刪除失敗!',
              icon: 'error',
              confirmButtonText: '關閉',
              confirmButtonColor: '#A0FF1F',
              background: 'rgba(0, 0, 0, 0.85)',
            });
          }
        } catch (error) {
          console.error('Error delete post status:', error);
          Swal.fire({
            title: '刪除失敗!',
            icon: 'error',
            confirmButtonText: '關閉',
            confirmButtonColor: '#A0FF1F',
            background: 'rgba(0, 0, 0, 0.85)',
          });
        }
      }
    });
  };

  const handleDeleteEventClick = async (event, modalId) => {
    const eventId = event.comm_event_id;

    if (!eventId) return;

    Swal.fire({
      title: '確定刪除?',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: `取消`,
      confirmButtonColor: '#A0FF1F',
      background: 'rgba(0, 0, 0, 0.85)',
    }).then(async (result) => {
      // 如果點擊確認刪除才執行
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:3001/community/delete-event`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
              },
              body: JSON.stringify({ eventId }),
            }
          );

          if (res.ok) {
            // 更新 events 狀態以移除已刪除的貼文
            setEvents((prevEvents) => {
              return prevEvents.filter(
                (event) => event.comm_event_id !== eventId
              );
            });

            Swal.fire({
              title: '刪除成功!',
              icon: 'success',
              confirmButtonText: '關閉',
              confirmButtonColor: '#A0FF1F',
              background: 'rgba(0, 0, 0, 0.85)',
            });
          } else {
            Swal.fire({
              title: '刪除失敗!',
              icon: 'error',
              confirmButtonText: '關閉',
              confirmButtonColor: '#A0FF1F',
              background: 'rgba(0, 0, 0, 0.85)',
            });
          }
        } catch (error) {
          console.error('Error delete post status:', error);
          Swal.fire({
            title: '刪除失敗!',
            icon: 'error',
            confirmButtonText: '關閉',
            confirmButtonColor: '#A0FF1F',
            background: 'rgba(0, 0, 0, 0.85)',
          });
        }
      }
    });
  };

  const handleDeleteCommentClick = async (comment, modalId) => {
    const commentId = comment.comm_comment_id;

    if (!commentId) return;

    const result = await Swal.fire({
      title: '確定刪除?',
      showCancelButton: true,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      confirmButtonColor: '#A0FF1F',
      background: 'rgba(0, 0, 0, 0.85)',
    });

    // 如果點擊確認刪除才執行
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3001/community/delete-comment`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              ...getAuthHeader(),
            },
            body: JSON.stringify({ commentId }),
          }
        );

        if (res.ok) {
          // 更新 comments 狀態以移除已刪除的回覆
          setComments((prevComments) => {
            // 遍歷所有貼文的評論
            const updatedComments = { ...prevComments };

            for (const postId in updatedComments) {
              // 過濾出除了要刪除的那個評論外的所有評論
              updatedComments[postId] = updatedComments[postId].filter(
                (comment) => comment.comm_comment_id !== commentId
              );
            }

            return updatedComments; // 返回更新後的評論對象
          });

          Swal.fire({
            title: '刪除成功!',
            icon: 'success',
            confirmButtonText: '關閉',
            confirmButtonColor: '#A0FF1F',
            background: 'rgba(0, 0, 0, 0.85)',
          });
          return true; // 確保成功時返回 true 給 handleRemoveNotification
        } else {
          Swal.fire({
            title: '刪除失敗!',
            icon: 'error',
            confirmButtonText: '關閉',
            confirmButtonColor: '#A0FF1F',
            background: 'rgba(0, 0, 0, 0.85)',
          });
        }
      } catch (error) {
        console.error('Error delete post status:', error);
        Swal.fire({
          title: '刪除失敗!',
          icon: 'error',
          confirmButtonText: '關閉',
          confirmButtonColor: '#A0FF1F',
          background: 'rgba(0, 0, 0, 0.85)',
        });
      }
    }
  };

  const checkPostsStatus = async (postIds) => {
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/community/check-post-status?userId=${userId}&postIds=${postIds}`,
        {
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const data = await response.json();

      // 初始化兩個對象來存儲所有貼文的喜愛和收藏狀態
      const newLikedPosts = { ...likedPosts };
      const newSavedPosts = { ...savedPosts };

      // 遍歷從後端獲取的每個貼文的狀態數據
      data.forEach((status) => {
        // 將每個貼文的點讚狀態存儲到 newLikedPosts 對象中
        newLikedPosts[status.postId] = status.isLiked;
        // 將每個貼文的收藏狀態存儲到 newSavedPosts 對象中
        newSavedPosts[status.postId] = status.isSaved;
      });

      // 更新 React 狀態以觸發界面更新，以顯示最新的點讚和收藏狀態
      setLikedPosts(newLikedPosts);
      setSavedPosts(newSavedPosts);
    } catch (error) {
      console.error('無法獲取貼文狀態:', error);
    }
  };

  const checkEventsStatus = async (eventIds) => {
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/community/check-event-status?userId=${userId}&eventIds=${eventIds}`,
        {
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const data = await response.json();

      // 初始化對象來存儲所有活動參加狀態
      const newAttendedEvents = { ...attendedEvents };

      // 遍歷從後端獲取的每個活動的狀態數據
      data.forEach((status) => {
        // 將每個活動參加狀態存儲到 newAttendedEvents 對象中
        newAttendedEvents[status.eventId] = status.isAttended;
      });

      // 更新 React 狀態以觸發界面更新，以顯示最新的參加狀態
      setAttendedEvents(newAttendedEvents);
    } catch (error) {
      console.error('無法獲取活動狀態:', error);
    }
  };

  const checkFollowingStatus = async (followingId) => {
    const userId = auth.id;

    if (userId === 0) return;

    try {
      const response = await fetch(
        `http://localhost:3001/community/check-follow-status?userId=${userId}&followingId=${followingId}`,
        {
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const data = await response.json();

      // 更新追蹤狀態
      setFollowing((prev) => ({
        ...prev,
        [followingId]: data.isFollowing,
      }));
    } catch (error) {
      console.error('無法獲取追蹤狀態:', error);
    }
  };

  // 重置貼文狀態
  const resetEventState = () => {
    setEventId('');
    setEventCreated(false);
  };

  // 上傳活動資訊
  const handleEventUpload = async () => {
    const userId = auth.id;

    if (userId === 0) {
      return;
    }

    if (!eventDetails) {
      Swal.fire({
        title: '請輸入活動內容!',
        icon: 'warning',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      });
      return;
    }

    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({
          ...eventDetails,
          status: 'upcoming',
          userId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEventId(data.event.comm_event_id);
        setEventCreated(true);
        return data.event.comm_event_id; // 返回 eventId 給 handleEventFileUpload
      } else {
        throw new Error(data.message || '新增活動失敗');
      }
    } catch (error) {
      console.error('upload event failed:', error);
      createEventModalRef.current.close();
      createEventModalMobileRef.current.close();

      Swal.fire({
        title: '創建活動失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  // 上傳圖片到伺服器
  const handleEventFileUpload = async () => {
    let currentEventId = eventId;

    if (!eventCreated) {
      currentEventId = await handleEventUpload();
      if (!currentEventId) {
        console.error('No event ID returned');
        return; // 如果新增貼文失敗或沒有 eventID 則停止執行
      }
      setEventId(currentEventId);
      setEventCreated(true);
    }

    const fd = new FormData();

    // 對照server上要獲取的檔案名稱(req.files.photo)
    fd.append('photo', selectedFile);
    fd.append('eventId', currentEventId);

    try {
      // 用fetch送出檔案
      const res = await fetch(
        'http://localhost:3001/community/upload-event-photo',
        {
          method: 'POST',
          body: fd,
          headers: { ...getAuthHeader() },
        }
      );

      const data = await res.json();

      if (res.ok) {
        // 更新活動以觸發刷新頁面 !!!Important!!!
        setEvents((prevEvents) => [data.event, ...prevEvents]);
      } else {
        throw new Error('Network response was not ok.');
      }

      // 關閉 create modal
      createEventModalRef.current.close();
      createEventModalMobileRef.current.close();

      Swal.fire({
        title: '創建活動成功!',
        icon: 'success',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
          resetEventState();
        }
      });
    } catch (error) {
      console.error('upload failed:', error);
      createEventModalRef.current.close();
      createEventModalMobileRef.current.close();

      Swal.fire({
        title: '創建活動失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      e.target.type = 'text';
    }
  };

  const handleTimeFocus = (e) => {
    e.target.type = 'time';
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file); // 假設你有這樣的函數設置選中的檔案
    handleFileChange({ target: { files: acceptedFiles } });
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 防止預設行為，如換行
      action(); // 執行傳入的回調函數
    }
  };

  useEffect(() => {
    const newSocket = io('http://localhost:3008');
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    socket?.emit('newUser', userInfo.username);
  }, [socket, userInfo]);

  useEffect(() => {
    if (auth.id) {
      getUserDetail();
    }
  }, [auth.id]);

  return (
    <PostContext.Provider
      value={{
        getCommunityIndexPost,
        getCommunityIndexFilteredPost,
        getCommunityExplorePost,
        getCommunityProfilePost,
        getCommunityEvents,
        getPostPage,
        getEventPage,
        uid,
        socket,
        userInfo,
        posts,
        setPosts,
        profilePosts,
        postPage,
        eventPageCard,
        filteredPosts,
        postsCount,
        setPostsCount,
        setFilteredPosts,
        filteredPage,
        setFilteredPage,
        currentKeyword,
        randomPosts,
        setPostContent,
        setProfilePosts,
        profilePage,
        setProfilePage,
        setEventPageCard,
        checkPostsStatus,
        checkFollowingStatus,
        getPostComments,
        comments,
        setComments,
        newComment,
        setNewComment,
        events,
        setEvents,
        minDate,
        setMinDate,
        minEndDate,
        setMinEndDate,
        indexHasMore,
        indexFilteredHasMore,
        exploreHasMore,
        profileHasMore,
        userProfileHasMore,
        setUserProfileHasMore,
        eventHasMore,
        commentHasMore,
        getPostComments,
        handleCommentUpload,
        handlePostUpload,
        handleFileUpload,
        handlePostUpdate,
        handleEventUpdate,
        handleFileChange,
        selectedFile,
        setSelectedFile,
        previewUrl,
        setPreviewUrl,
        resetAndCloseModal,
        handleFilePicker,
        handleLikedClick,
        handleSavedClick,
        handleAttendedClick,
        handleFollowClick,
        handleDeletePostClick,
        handleDeleteEventClick,
        handleDeleteCommentClick,
        handleFilterClick,
        handleFileChange,
        likedPosts,
        savedPosts,
        attendedEvents,
        setEventDetails,
        following,
        setFollowing,
        handleEventUpload,
        handleEventFileUpload,
        handleDateFocus,
        handleBlur,
        handleTimeFocus,
        onDrop,
        handleKeyPress,
        postModalToggle,
        setPostModalToggle,
        isFilterActive,
        setIsFilterActive,
        activeFilterButton,
        setActiveFilterButton,
        isHoverActive,
        setIsHoverActive,
        reload,
        setReload,
        searchTerm,
        searchResults,
        hasSearched,
        getSearchUsers,
        resetAndCloseSearchModal,
        resetAndCloseFollowerModal,
        resetAndCloseFollowingModal,
        fileInputRef,
        createModalRef,
        createModalMobileRef,
        createEventModalRef,
        createEventModalMobileRef,
        searchModalRef,
        searchModalMobileRef,
        followerModalRef,
        followingModalRef,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
