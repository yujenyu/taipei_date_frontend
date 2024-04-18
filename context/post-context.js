import { useState, useEffect, createContext, useContext } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const getPost = async () => {
    if (!hasMore) return; // 防止重複請求
    // setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/posts?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      }
      setPosts((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
      setPage((prevPage) => prevPage + 1); // 更新頁碼
      // setIsLoading(false); // 結束加載
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      // setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  const getPostComment = async (post) => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-comment/${post.post_id}`
      );
      console.log(post.post_id);
      const data = await res.json();
      setComments(data);
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  // 上傳回覆
  const handleCommentUpload = async (post) => {
    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/add-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ==================================== TODO TODO TODO ====================================
        body: JSON.stringify({
          context: newComment,
          status: 'posted',
          postId: post.post_id,
          userId: 1,
        }), // TODO: 需動態更改 userId
        // ==================================== TODO TODO TODO ====================================
      });
      const data = await res.json();
      if (res.ok) {
        // console.log('回覆成功: ', data);
        // ==================================== TODO TODO TODO ====================================
        setComments((prevComments) => [
          ...prevComments,
          { ...data, user_id: 1 },
        ]); // TODO: 需動態更改 userId
        // ==================================== TODO TODO TODO ====================================
        setNewComment(''); // 清空 textarea
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
    // 如果已喜愛, 則取消喜愛
    if (isLiked) {
      // 發送取消收藏的請求
      try {
        const res = await fetch('http://localhost:3001/community/unlike-post', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          // ==================================== TODO TODO TODO ====================================
          body: JSON.stringify({ postId: post.post_id, userId: 1 }), // TODO: 需動態更改 userId
          // ==================================== TODO TODO TODO ====================================
        });
        if (res.ok) {
          setIsLiked(false);
          // console.log('取消喜愛成功');
        } else {
          throw new Error('取消喜愛失敗');
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const res = await fetch('http://localhost:3001/community/like-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // ==================================== TODO TODO TODO ====================================
          body: JSON.stringify({ postId: post.post_id, userId: 1 }), // TODO: 需動態更改 userId
          // ==================================== TODO TODO TODO ====================================
        });
        if (res.ok) {
          setIsLiked(true);
          // console.log('喜愛成功');
        } else {
          throw new Error('喜愛失敗');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleSavedClick = async (post) => {
    // 如果已收藏, 則取消收藏
    if (isSaved) {
      // 發送取消收藏的請求
      try {
        const res = await fetch('http://localhost:3001/community/unsave-post', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          // ==================================== TODO TODO TODO ====================================
          body: JSON.stringify({ postId: post.post_id, userId: 1 }), // TODO: 需動態更改 userId
          // ==================================== TODO TODO TODO ====================================
        });
        if (res.ok) {
          setIsSaved(false);
          // console.log('取消收藏成功');
        } else {
          throw new Error('取消收藏失敗');
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      try {
        const res = await fetch('http://localhost:3001/community/save-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // ==================================== TODO TODO TODO ====================================
          body: JSON.stringify({ postId: post.post_id, userId: 1 }), // TODO: 需動態更改 userId
          // ==================================== TODO TODO TODO ====================================
        });
        if (res.ok) {
          setIsSaved(true);
          // console.log('收藏成功');
        } else {
          throw new Error('收藏失敗');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  // 檢查貼文是否已被當前用戶收藏
  const fetchIsLiked = async (post) => {
    try {
      // ==================================== TODO TODO TODO ====================================
      const response = await fetch(
        `http://localhost:3001/community/isLiked-post?postId=${post.post_id}&userId=1`
      ); // TODO: 需動態更改 userId
      // ==================================== TODO TODO TODO ====================================
      const data = await response.json();
      if (data.isLiked) {
        setIsLiked(data.isLiked);
      }
    } catch (error) {
      console.error('無法獲取收藏狀態:', error);
    }
  };

  // 檢查貼文是否已被當前用戶收藏
  const fetchIsSaved = async (post) => {
    try {
      // ==================================== TODO TODO TODO ====================================
      const response = await fetch(
        `http://localhost:3001/community/isSaved-post?postId=${post.post_id}&userId=1`
      ); // TODO: 需動態更改 userId
      // ==================================== TODO TODO TODO ====================================
      const data = await response.json();
      if (data.isSaved) {
        setIsSaved(data.isSaved);
      }
    } catch (error) {
      console.error('無法獲取收藏狀態:', error);
    }
  };

  useEffect(() => {
    getPostComment();
    handleCommentUpload();
    handleLikedClick();
    handleSavedClick();
    fetchIsLiked();
    fetchIsSaved();
  }, []);

  return (
    <PostContext.Provider
      value={{
        post,
        isLiked,
        isSaved,
        hasMore,
        setIsLiked,
        setIsSaved,
        getPost,
        getPostComment,
        handleCommentUpload,
        handleLikedClick,
        handleSavedClick,
        fetchIsLiked,
        fetchIsSaved,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
