import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import Link from 'next/link';
import Router from 'next/router';
import { FiSend, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ShareModal from '../modal/shareModal';

export default function PostModal({ post, modalId, isOpen }) {
  const { auth } = useAuth();

  const {
    handleLikedClick,
    handleSavedClick,
    likedPosts,
    savedPosts,
    comments,
    newComment,
    setNewComment,
    handleCommentUpload,
    handleDeletePostClick,
    handleDeleteCommentClick,
    setPostModalToggle,
    handleKeyPress,
  } = usePostContext();

  const userId = auth.id;

  const isLiked = likedPosts[post.post_id] || false;
  const isSaved = savedPosts[post.post_id] || false;

  const handleCommentContentChange = (e) => {
    setNewComment(e.target.value);
  };

  useEffect(() => {
    // 定義路由變化完成後要執行的函數，這個函數將會關閉 modal
    const handleRouteChange = () => {
      setPostModalToggle(false); // 關閉 modal
    };

    // 監聽路由變化完成事件
    Router.events.on('routeChangeComplete', handleRouteChange);

    // 在組件卸載或重新渲染前，移除監聽器，這是為了避免記憶體洩漏和重複註冊監聽器
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <div
        id={modalId}
        className={`modal z-50 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="flex modal-box w-[90vw] max-w-[90vw] h-[90vh] overflow-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <button
            onClick={() => {
              setPostModalToggle(false);
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-h3"
          >
            ✕
          </button>

          <div className="container flex flex-col md:flex-row">
            <figure
              className="flex flex-col w-full md:w-1/2 card-photo m-0 "
              onDoubleClick={() => handleLikedClick(post)}
            >
              <img
                src={post.img || '/unavailable-image.jpg'}
                alt={post.photo_name || 'No Image Available'}
                className="object-contain h-full w-full"
              />
            </figure>

            <div className="flex flex-col card-body h-full w-full md:w-1/2 p-0 overflow-auto px-5">
              <div className="flex flex-row first-letter:card-user h-10  items-center gap-2 m-2 justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Link href={`/community/profile/${post.post_userId}`}>
                        <img
                          src={post.avatar || '/unknown-user-image.jpg'}
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
                {/* 只有當用戶登入時顯示這些元件 */}
                {userId !== 0 && userId !== null && (
                  <div className="flex justify-end">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} className="m-2">
                        <FiMoreHorizontal className="card-icon hover:text-neongreen" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        }}
                      >
                        <li>
                          <a
                            className="hover:text-neongreen"
                            onClick={() => handleDeletePostClick(post, modalId)}
                          >
                            刪除貼文
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="context flex mb-10">
                <p>{post.post_context}</p>
              </div>

              {/* comment list */}
              {comments[post.post_id] &&
                comments[post.post_id].map((comment, index) => (
                  <div
                    key={index}
                    className="comment flex flex-col comment space-y-4 "
                  >
                    <div className="card-user flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <Link href={`/community/profile/${comment.user_id}`}>
                            <img
                              src={comment.avatar || '/unknown-user-image.jpg'}
                              alt={post.photo_name || 'No Image Available'}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <Link href={`/community/profile/${comment.user_id}`}>
                          <span>
                            {comment.email
                              ? comment.email.split('@')[0]
                              : 'unknownuser'}
                          </span>
                        </Link>
                        <p className="text-right">{comment.context}</p>

                        {/* 只有當用戶登入時顯示這些元件 */}
                        {userId !== 0 && userId !== null && (
                          <div className="flex justify-end">
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} className="m-2">
                                <FiMoreHorizontal className="card-icon hover:text-neongreen" />
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                                style={{
                                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                }}
                              >
                                <li>
                                  <a
                                    className="hover:text-neongreen"
                                    onClick={() =>
                                      handleDeleteCommentClick(comment)
                                    }
                                  >
                                    刪除回覆
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {/* 只有當用戶登入時顯示這些元件 */}
              {userId !== 0 && userId !== null && (
                <div className="my-5 h-auto">
                  <div className="card-iconList text-h4 flex flex-row justify-between mb-5">
                    <div className="card-iconListLeft flex flex-row gap-2">
                      {isLiked ? (
                        <FaHeart
                          className="card-ico hover:text-neongreen"
                          onClick={() => handleLikedClick(post)}
                        />
                      ) : (
                        <FaRegHeart
                          className="card-icon hover:text-neongreen"
                          onClick={() => handleLikedClick(post)}
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
                          onClick={() => handleSavedClick(post)}
                        />
                      ) : (
                        <FaRegBookmark
                          className="card-icon hover:text-neongreen"
                          onClick={() => handleSavedClick(post)}
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
                      onKeyDown={(e) =>
                        // 使用 onKeyDown 並檢查是否按下 Enter 鍵
                        handleKeyPress(e, () =>
                          handleCommentUpload(post, newComment)
                        )
                      }
                    />
                    <button
                      className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center"
                      onClick={() => handleCommentUpload(post, newComment)}
                    >
                      分享
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </>
  );
}
