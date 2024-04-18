import { useState, useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import Link from 'next/link';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ShareModal from '../modal/shareModal';

export default function PostModal({ post, modalId }) {
  // fake data
  // const mockComments = Array.from({ length: 10 }, (_, i) => ({
  //   id: i,
  //   userId: `User ${i + 1}`,
  //   content: `Comment content ${i + 1}`,
  // }));

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentContentChange = (e) => {
    setNewComment(e.target.value);
  };

  const getPostComment = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-comment/${post.post_id}`
      );
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
  const handleCommentUpload = async () => {
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

  const handleLikedClick = async () => {
    // 如果已喜愛, 則取消喜愛
    if (isLiked) {
      // 發送取消喜愛的請求
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

  const handleSavedClick = async () => {
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
  const fetchIsLiked = async () => {
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
  const fetchIsSaved = async () => {
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

  // const handleReplyClick = () => {
  //   setShowReply(!showReply);
  // };

  useEffect(() => {
    fetchIsLiked();
    fetchIsSaved();
    getPostComment();
  }, [post.post_id]); // 依賴 post.post_id 確保當貼文更新時重新檢查

  return (
    <>
      <dialog id={modalId} className="modal ">
        <div
          className="flex modal-box w-[90vw] max-w-[90vw] h-[90vh] overflow-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-h3">
              ✕
            </button>
          </form>

          <div className="container flex flex-col md:flex-row">
            <figure
              className="flex flex-col w-full md:w-1/2 card-photo m-0 "
              onDoubleClick={handleLikedClick}
            >
              <img
                src={post.img || '../../../public/unavailable-image.jpg'}
                alt={post.photo_name || 'No Image Available'}
                className="object-contain h-full w-full"
              />
            </figure>

            <div className="flex flex-col card-body h-full w-full md:w-1/2 p-0 overflow-auto px-5">
              <div className="flex flex-row first-letter:card-user h-10  items-center gap-2 m-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <Link href={`/community/profile/${post.post_userId}`}>
                      <img
                        src={
                          post.img || '../../../public/unavailable-image.jpg'
                        }
                        alt={post.photo_name || 'No Image Available'}
                      />
                    </Link>
                  </div>
                </div>
                <Link href={`/community/profile/${post.post_userId}`}>
                  <span>
                    {/* 處理從 member_user 拿到的 email, 僅保留 @ 之前的 id */}
                    {post.email ? post.email.split('@')[0] : 'unknownuser'}
                  </span>
                </Link>
              </div>
              <div className="context flex mb-10">
                <p>{post.post_context}</p>
              </div>

              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="comment flex flex-col comment space-y-4 "
                >
                  <div className="card-user flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-8 rounded-full">
                        <Link href={`/community/profile/${comment.user_id}`}>
                          <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt={`Avatar ${comment.user_id}`}
                          />
                        </Link>
                      </div>
                    </div>
                    <Link href={`/community/profile/${comment.user_id}`}>
                      <span>
                        {comment.email
                          ? comment.email.split('@')[0]
                          : 'unknownuser'}
                      </span>
                    </Link>
                    <p className="text-right">{comment.context}</p>
                  </div>
                </div>
              ))}

              <div className="my-5 h-auto">
                <div className="card-iconList text-h4 flex flex-row justify-between mb-5">
                  <div className="card-iconListLeft flex flex-row gap-2">
                    {isLiked ? (
                      <FaHeart
                        className="card-ico hover:text-neongreen"
                        onClick={handleLikedClick}
                      />
                    ) : (
                      <FaRegHeart
                        className="card-icon hover:text-neongreen"
                        onClick={handleLikedClick}
                      />
                    )}
                    <FiMessageCircle className="card-icon hover:text-neongreen" />
                    <FiSend
                      className="card-icon hover:text-neongreen"
                      onClick={() =>
                        document.getElementById('share_modal').showModal()
                      }
                    />
                    <ShareModal />
                  </div>
                  <div className="card-iconListRight flex justify-end">
                    {isSaved ? (
                      <FaBookmark
                        className="card-icon hover:text-neongreen"
                        onClick={handleSavedClick}
                      />
                    ) : (
                      <FaRegBookmark
                        className="card-icon hover:text-neongreen"
                        onClick={handleSavedClick}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-row card-actions justify-center">
                  <textarea
                    className="textarea textarea-ghost w-full h-16 resize-none rounded-full mb-3"
                    placeholder="新增回覆"
                    value={newComment} // 綁定 textarea 的值到 state
                    onChange={handleCommentContentChange}
                  />
                  <button
                    className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center"
                    onClick={handleCommentUpload}
                  >
                    分享
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
