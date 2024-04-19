import { useState, createContext, useContext } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});

  const getCommunityIndexPost = async () => {
    if (!hasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
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

  const getCommunityExplorePost = async () => {
    if (!hasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/get-random-posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const postIds = data.map((post) => post.post_id).join(',');

        await checkPostsStatus(postIds); // 檢查貼文狀態
        await getPostComments(postIds);

        setPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch explore posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getCommunityProfilePost = async () => {
    if (!hasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載
    try {
      const res = await fetch(
        `http://localhost:3001/community/posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        const postIds = data.map((post) => post.post_id).join(',');

        await checkPostsStatus(postIds); // 檢查貼文狀態
        await getPostComments(postIds);

        setPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch profile posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getCommunityEvents = async () => {
    if (!hasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/events?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      } else {
        setEvents((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
        setPage((prevPage) => prevPage + 1); // 更新頁碼
        // setIsLoading(false); // 結束加載
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setIsLoading(false); // 確保即使出錯也要結束加載
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
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  // 上傳回覆
  const handleCommentUpload = async (post, newComment) => {
    const postId = post.post_id;
    // ==================================== TODO TODO TODO ====================================
    const userId = 1; // TODO: 需動態更改 userId
    // ==================================== TODO TODO TODO ===================================

    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/add-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ==================================== TODO TODO TODO ====================================
        body: JSON.stringify({
          context: newComment,
          status: 'posted',
          postId,
          userId,
        }), // TODO: 需動態更改 userId
        // ==================================== TODO TODO TODO ====================================
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

  const handleLikedClick = async (post) => {
    const postId = post.post_id;
    // ==================================== TODO TODO TODO ====================================
    const userId = 1; // TODO: 需動態更改 userId
    // ==================================== TODO TODO TODO ===================================

    const wasLiked = likedPosts[postId] || false;
    const newLikedState = !wasLiked;

    try {
      const url = wasLiked ? 'unlike-post' : 'like-post';
      const res = await fetch(`http://localhost:3001/community/${url}`, {
        method: wasLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const handleSavedClick = async (post) => {
    const postId = post.post_id;
    // ==================================== TODO TODO TODO ====================================
    const userId = 1; // TODO: 需動態更改 userId
    // ==================================== TODO TODO TODO ===================================

    const wasSaved = savedPosts[postId] || false;
    const newSavedState = !wasSaved;

    try {
      const url = wasSaved ? 'unsave-post' : 'save-post';
      const res = await fetch(`http://localhost:3001/community/${url}`, {
        method: wasSaved ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const checkPostsStatus = async (postIds) => {
    // ==================================== TODO TODO TODO ====================================
    const userId = 1; // TODO: 需動態更改 userId
    // ==================================== TODO TODO TODO ===================================

    try {
      const response = await fetch(
        `http://localhost:3001/community/check-post-status?userId=${userId}&postIds=${postIds}`
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

  return (
    <PostContext.Provider
      value={{
        getCommunityIndexPost,
        getCommunityExplorePost,
        getCommunityProfilePost,
        getCommunityEvents,
        posts,
        comments,
        setComments,
        newComment,
        setNewComment,
        events,
        setEvents,
        hasMore,
        getPostComments,
        handleCommentUpload,
        handleLikedClick,
        handleSavedClick,
        likedPosts,
        savedPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
