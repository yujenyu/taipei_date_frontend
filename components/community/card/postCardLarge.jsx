import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import Link from 'next/link';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ShareModal from '../modal/shareModal';
import PostModal from '../modal/postModal';

export default function PostCardLarge({ post }) {
  const { auth } = useAuth();
  const { handleLikedClick, handleSavedClick, likedPosts, savedPosts } =
    usePostContext();

  const userId = auth.id;

  const isLiked = likedPosts[post.post_id] || false;
  const isSaved = savedPosts[post.post_id] || false;

  // 基於 post_id 的唯一 id
  const modalId = `photo_modal_${post.post_id}`;

  const handleShowModal = () => {
    document.getElementById(modalId).showModal();
  };

  return (
    <>
      <div className="card w-[480px] h-[700px] overflow-hidden flex border border-grayBorder">
        <div className="card-user h-10 flex items-center gap-2 m-2">
          <Link href={`/community/profile/${post.post_userId}`}>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={post.avatar || '/unknown-user-image.jpg'}
                  alt={post.photo_name || 'No Image Available'}
                />
              </div>
            </div>
          </Link>
          <Link href={`/community/profile/${post.post_userId}`}>
            <span>{post.email ? post.email.split('@')[0] : 'unknownuser'}</span>
          </Link>
        </div>
        <figure className="card-photo m-0" onDoubleClick={handleLikedClick}>
          <img
            src={post.img || '/unavailable-image.jpg'}
            alt={post.photo_name || 'No Image Available'}
            className="card-photo w-[480px] h-[480px] object-cover"
          />
        </figure>
        <div className="card-body w-full p-0 overflow-auto max-w-[480px] px-3 py-3">
          {/* 只有當用戶登入時顯示這些元件 */}
          {userId !== 0 && userId !== null && (
            <div className="card-iconList text-h4 flex flex-row justify-between">
              <div className="card-iconListLeft flex flex-row gap-1">
                {isLiked ? (
                  <FaHeart
                    className="card-icon hover:text-neongreen"
                    onClick={() => handleLikedClick(post)}
                  />
                ) : (
                  <FaRegHeart
                    className="card-icon  hover:text-neongreen"
                    onClick={() => handleLikedClick(post)}
                  />
                )}

                <FiMessageCircle
                  className="card-icon hover:text-neongreen"
                  onClick={handleShowModal}
                />
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
          )}
          <p className="postContext">{post.post_context}</p>
          <p
            className="commentontext text-[12px] text-grayBlue cursor-pointer"
            onClick={handleShowModal}
          >
            查看回覆
          </p>
          <PostModal post={post} modalId={modalId} />
          {/* {showReply && (
            <div className="flex flex-col justify-center items-center">
              <textarea
                className="textarea textarea-ghost w-full h-16 resize-none rounded-full mb-3"
                placeholder="新增回覆"
              />
              <button className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center">
                分享
              </button>
            </div>
          )} */}
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}
