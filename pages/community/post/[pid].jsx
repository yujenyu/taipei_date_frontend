import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePostContext } from '@/context/post-context';
import { FiSend, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ShareModal from '../../../components/community/modal/shareModal';
import EditModal from '../../../components/community/modal/editModal';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import Sidebar from '@/components/community/sidebar/sidebar';

export default function Post() {
  const { auth } = useAuth();

  const router = useRouter();

  const textareaRef = useRef(null);

  const { pid } = router.query;

  const {
    socket,
    userInfo,
    getPostPage,
    postPage,
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
    handleKeyPress,
  } = usePostContext();

  const userId = auth.id;

  const isLiked = likedPosts[postPage.post_id] || false;
  const isSaved = savedPosts[postPage.post_id] || false;

  // 基於 post_id 的唯一 edit modal id
  const editModalId = `edit_modal_${postPage.post_id}`;

  // 基於 post_id 的唯一 share modal id
  const shareModalId = `share_modal_${postPage.post_id}`;

  const handleCommentContentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleNotification = (type) => {
    // 確保 socket已獲取
    if (socket) {
      const notificationData = {
        senderId: userInfo.user_id,
        senderName: userInfo.username,
        avatar: userInfo.avatar,
        receiverId: postPage.post_userId,
        receiverName: postPage.username,
        type: type,
        postId: postPage.post_id,
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

  const handleRemoveNotification = (type) => {
    if (socket) {
      const notificationData = {
        senderId: userInfo.user_id,
        receiverId: postPage.post_userId,
        postId: postPage.post_id,
        type: type,
      };
      socket.emit('removeNotification', notificationData);
    }
  };

  useEffect(() => {
    if (auth.id) {
      getPostPage(pid);
    }
  }, [auth.id, pid]);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full items-center justify-center pt-28 ">
        <div className="flex flex-wrap justify-center w-full min-h-screen">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>

          <div className="flex flex-col md:w-10/12 items-center">
            <div className="flex max-w-[80vw] max-h-[80vh] overflow-auto">
              <div className="container flex flex-col md:flex-row ">
                <figure
                  className="flex flex-col w-full md:w-1/2 card-photo mx-3"
                  onDoubleClick={() => {
                    handleLikedClick(postPage);
                    handleRemoveNotification('like');
                    if (!isLiked) {
                      handleNotification('like');
                    }
                  }}
                >
                  <img
                    src={postPage.img || '/unavailable-image.jpg'}
                    alt={postPage.photo_name || 'No Image Available'}
                    className="object-contain h-full w-full"
                  />
                </figure>

                <div className="flex flex-col card-body h-full w-full md:w-1/2 overflow-auto mx-3 my-3">
                  <div className="flex flex-row first-letter:card-user h-10  items-center gap-2 m-2 justify-between">
                    <div className="flex justify-start items-center gap-2">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <Link
                            href={`/community/profile/${postPage.post_userId}`}
                          >
                            <img
                              src={postPage.avatar || '/unknown-user-image.jpg'}
                              alt={postPage.photo_name || 'No Image Available'}
                            />
                          </Link>
                        </div>
                      </div>
                      <Link href={`/community/profile/${postPage.post_userId}`}>
                        <span>
                          {/* 處理從 member_user 拿到的 email, 僅保留 @ 之前的 id */}
                          {postPage.email
                            ? postPage.email.split('@')[0]
                            : 'unknownuser'}
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
                            className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-32"
                            style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            }}
                          >
                            <li>
                              <a
                                className="hover:text-neongreen"
                                onClick={() =>
                                  document
                                    .getElementById(editModalId)
                                    .showModal()
                                }
                              >
                                編輯貼文
                              </a>
                            </li>
                            <li>
                              <a
                                className="hover:text-neongreen"
                                onClick={() => handleDeletePostClick(postPage)}
                              >
                                刪除貼文
                              </a>
                            </li>
                          </ul>
                        </div>
                        <EditModal
                          post={postPage}
                          modalId={editModalId}
                          key={postPage.post_id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="context flex mb-10">
                    <p>{postPage.post_context}</p>
                  </div>

                  {/* comment list */}
                  {comments[postPage.post_id] &&
                    comments[postPage.post_id].map((comment, index) => (
                      <div
                        key={index}
                        className="comment flex flex-col comment space-y-4 "
                      >
                        <div className="card-user flex items-center gap-2">
                          <div className="avatar">
                            <div className="w-8 rounded-full">
                              <Link
                                href={`/community/profile/${comment.user_id}`}
                              >
                                <img
                                  src={
                                    comment.avatar || '/unknown-user-image.jpg'
                                  }
                                  alt={
                                    postPage.photo_name || 'No Image Available'
                                  }
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full flex-wrap">
                            <span className="mx-3">
                              <Link
                                href={`/community/profile/${comment.user_id}`}
                              >
                                {comment.email
                                  ? comment.email.split('@')[0]
                                  : 'unknownuser'}
                              </Link>
                            </span>

                            <span className="flex-auto mx-3 break-words whitespace-normal overflow-hidden">
                              {comment.context}
                            </span>

                            {/* 只有當用戶登入時顯示這些元件 */}
                            {userId !== 0 && userId !== null && (
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
                                            await handleDeleteCommentClick(
                                              comment
                                            );
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
                              onClick={() => {
                                handleLikedClick(postPage);
                                handleRemoveNotification('like');
                              }}
                            />
                          ) : (
                            <FaRegHeart
                              className="card-icon hover:text-neongreen"
                              onClick={() => {
                                handleLikedClick(postPage);
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
                            onClick={() =>
                              document.getElementById(shareModalId).showModal()
                            }
                          />
                          <ShareModal
                            post={postPage}
                            key={postPage.post_id}
                            postId={postPage.post_id}
                            modalId={shareModalId}
                          />
                        </div>
                        <div className="card-iconListRight flex justify-end">
                          {isSaved ? (
                            <FaBookmark
                              className="card-icon hover:text-neongreen"
                              onClick={() => handleSavedClick(postPage)}
                            />
                          ) : (
                            <FaRegBookmark
                              className="card-icon hover:text-neongreen"
                              onClick={() => handleSavedClick(postPage)}
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
                              handleCommentUpload(postPage, newComment);
                              handleNotification('comment');
                            })
                          }
                        />
                        <button
                          className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center"
                          onClick={() => {
                            handleCommentUpload(postPage, newComment);
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
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
