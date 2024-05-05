import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import { useRouter } from 'next/router';
import Router from 'next/router';
import ShareModal from '../modal/shareModal';
import EditModal from '../modal/editModal';
import { FiSend, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function ExploreModal({ post, modalId, isOpen }) {
  const { auth } = useAuth();

  const router = useRouter();

  const {
    socket,
    userInfo,
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
    setProfilePosts,
    setProfilePage,
    setUserProfileHasMore,
    handleKeyPress,
  } = usePostContext();

  const exploreModalRef = useRef(null);

  const textareaRef = useRef(null);

  const userId = auth.id;

  const isLiked = likedPosts[post.post_id] || false;
  const isSaved = savedPosts[post.post_id] || false;

  // 基於 post_id 的唯一 edit modal id
  const editModalId = `edit_modal_${post.post_id}`;

  // 基於 post_id 的唯一 share modal id
  const shareModalId = `share_modal_${post.post_id}`;

  const handleCommentContentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleUserClick = (userId) => {
    // 清空當前貼文列表和重置頁碼以確保載入新用戶的貼文
    setProfilePosts([]);
    setProfilePage(1);
    setUserProfileHasMore(true);
    setPostModalToggle(false);

    router.push(`/community/profile/${userId}`);
  };

  const handleNotification = (type) => {
    // 確保 socket已獲取
    if (socket) {
      const notificationData = {
        senderId: userInfo.user_id,
        senderName: userInfo.username,
        avatar: userInfo.avatar,
        receiverId: post.post_userId,
        receiverName: post.username,
        type: type,
        postId: post.post_id,
        message: `${userInfo.username} ${
          type === 'like'
            ? '喜愛你的貼文'
            : type === 'comment'
            ? '回覆你的貼文'
            : '開始追蹤你'
        }`,
      };
      socket.emit('sendNotification', notificationData);
    }
  };

  // TODO: 刪除 comment 並刪除其通知有 bug, 會將同個 post 的 comment 通知一併刪除
  const handleRemoveNotification = (type) => {
    if (socket) {
      const notificationData = {
        senderId: userInfo.user_id,
        receiverId: post.post_userId,
        postId: post.post_id,
        type: type,
      };
      socket.emit('removeNotification', notificationData);
    }
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
        ref={exploreModalRef}
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
              className="flex flex-col w-full md:w-1/2 card-photo mx-3"
              onDoubleClick={() => {
                handleLikedClick(post);
                handleRemoveNotification('like');
                if (!isLiked) {
                  handleNotification('like');
                }
              }}
            >
              <img
                src={post.img || '/unavailable-image.jpg'}
                alt={post.photo_name || 'No Image Available'}
                className="object-contain h-full w-full"
              />
            </figure>

            <div className="flex flex-col card-body h-full w-full md:w-1/2 overflow-auto mx-3">
              <div className="flex flex-row first-letter:card-user h-10  items-center gap-2 m-2 justify-between">
                <div className="flex justify-start items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleUserClick(post.post_userId)}
                      >
                        <img
                          src={post.avatar || '/unknown-user-image.jpg'}
                          alt={post.photo_name || 'No Image Available'}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleUserClick(post.post_userId)}
                  >
                    <span>
                      {/* 處理從 member_user 拿到的 email, 僅保留 @ 之前的 id */}
                      {post.email ? post.email.split('@')[0] : 'unknownuser'}
                    </span>
                  </div>
                </div>
                {/* 只有當用戶登入時顯示這些元件 */}
                {userId === post.post_userId ? (
                  <div className="flex justify-end">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} className="m-2">
                        <FiMoreHorizontal className="card-icon hover:text-neongreen" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-32"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        }}
                      >
                        <li>
                          <a
                            className="hover:text-neongreen"
                            onClick={() =>
                              document.getElementById(editModalId).showModal()
                            }
                          >
                            編輯貼文
                          </a>
                        </li>
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
                    <EditModal
                      post={post}
                      modalId={editModalId}
                      key={post.post_id}
                    />
                  </div>
                ) : null}
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
                          <div
                            className="cursor-pointer"
                            onClick={() => handleUserClick(comment.user_id)}
                          >
                            <img
                              src={comment.avatar || '/unknown-user-image.jpg'}
                              alt={post.photo_name || 'No Image Available'}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full flex-wrap">
                        <span className="mx-3">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleUserClick(comment.user_id)}
                          >
                            {comment.email
                              ? comment.email.split('@')[0]
                              : 'unknownuser'}
                          </div>
                        </span>

                        <span className="flex-auto mx-3 break-words whitespace-normal overflow-hidden">
                          {comment.context}
                        </span>

                        {/* 只有當用戶登入時顯示這些元件 */}
                        {userId === comment.user_id ? (
                          <div className="flex justify-end">
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} className="">
                                <FiMoreHorizontal className="card-icon hover:text-neongreen mx-3" />
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-32"
                                style={{
                                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                }}
                              >
                                <li>
                                  <a
                                    className="hover:text-neongreen"
                                    onClick={async () => {
                                      // 使用 async 等待確認刪除再刪除 noti
                                      const result =
                                        await handleDeleteCommentClick(comment);
                                      if (result) {
                                        handleRemoveNotification('comment');
                                      }
                                    }}
                                  >
                                    刪除回覆
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : null}
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
                          className="card-icon hover:text-neongreen"
                          onClick={() => {
                            handleLikedClick(post);
                            handleRemoveNotification('like');
                          }}
                        />
                      ) : (
                        <FaRegHeart
                          className="card-icon hover:text-neongreen"
                          onClick={() => {
                            handleLikedClick(post);
                            handleNotification('like');
                          }}
                        />
                      )}
                      <FiMessageCircle
                        className="card-icon hover:text-neongreen"
                        onClick={() =>
                          textareaRef.current && textareaRef.current.focus()
                        }
                      />
                      <FiSend
                        className="card-icon hover:text-neongreen"
                        onClick={() => {
                          document.getElementById(shareModalId).showModal();
                        }}
                      />
                      <ShareModal
                        post={post}
                        key={post.post_id}
                        postId={post.post_id}
                        modalId={shareModalId}
                      />
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
                      ref={textareaRef}
                      className="textarea textarea-ghost w-full h-16 resize-none rounded-full mb-3"
                      placeholder="新增回覆"
                      value={newComment} // 綁定 textarea 的值到 state
                      onChange={handleCommentContentChange}
                      onKeyDown={(e) =>
                        // 使用 onKeyDown 並檢查是否按下 Enter 鍵
                        handleKeyPress(e, () => {
                          handleCommentUpload(post, newComment);
                          handleNotification('comment');
                        })
                      }
                    />
                    <button
                      className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center"
                      onClick={() => {
                        handleCommentUpload(post, newComment);
                        handleNotification('comment');
                      }}
                    >
                      回覆
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            setPostModalToggle(false);
          }}
        >
          <button>close</button>
        </form>
      </div>
    </>
  );
}
