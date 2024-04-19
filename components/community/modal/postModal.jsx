import { usePostContext } from '@/context/post-context';
import Link from 'next/link';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ShareModal from '../modal/shareModal';

export default function PostModal({ post, modalId }) {
  const {
    handleLikedClick,
    handleSavedClick,
    likedPosts,
    savedPosts,
    comments,
    newComment,
    setNewComment,
    handleCommentUpload,
  } = usePostContext();

  const isLiked = likedPosts[post.post_id] || false;
  const isSaved = savedPosts[post.post_id] || false;

  const handleCommentContentChange = (e) => {
    setNewComment(e.target.value);
  };

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
                  />
                  <button
                    className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center"
                    onClick={() => handleCommentUpload(post, newComment)}
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
