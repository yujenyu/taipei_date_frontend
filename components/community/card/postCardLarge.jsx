import { useState } from 'react';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import ShareModal from '../modal/shareModal';

// const mockData = {
//   userId: 'USERID',
//   context:
//     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur corrupti aspernatur quas Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur corrupti aspernatur quas',
// };

export default function PostCardLarge({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleLikedClick = () => {
    setIsLiked(!isLiked);
  };

  const handleSavedClick = () => {
    setIsSaved(!isSaved);
  };

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  return (
    <>
      <div className="card w-[480px] h-[700px] overflow-hidden flex border border-grayBorder">
        <div className="card-user h-10 flex items-center gap-2 m-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={post.img || '../../../public/unavailable-image.jpg'}
                alt={post.photo_name || 'No Image Available'}
              />
            </div>
          </div>
          <span>{post.user_id}</span>
        </div>
        <figure className="card-photo m-0" onDoubleClick={handleLikedClick}>
          <img
            src={post.img || '../../../public/unavailable-image.jpg'}
            alt={post.photo_name || 'No Image Available'}
            className="card-photo w-[480px] h-[480px] object-cover"
          />
        </figure>
        <div className="card-body w-full p-0 overflow-auto max-w-[480px] px-1 py-1">
          <div className="card-iconList text-h4 flex flex-row justify-between">
            <div className="card-iconListLeft flex flex-row gap-1">
              {isLiked ? (
                <FaHeart
                  className="card-icon hover:text-neongreen"
                  onClick={handleLikedClick}
                />
              ) : (
                <FaRegHeart
                  className="card-icon  hover:text-neongreen"
                  onClick={handleLikedClick}
                />
              )}

              <FiMessageCircle
                className="card-icon hover:text-neongreen"
                onClick={handleReplyClick}
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
          {/* <h2 className="card-title">Life hack</h2> */}
          <p className="context">{post.context}</p>
          {showReply && (
            <div className="flex flex-col justify-center items-center">
              <textarea
                className="textarea textarea-ghost w-full h-16 resize-none"
                placeholder="新增回覆"
              />
              <button className="btn bg-neongreen hover:bg-neongreen text-light w-24 flex justify-center">
                分享
              </button>
            </div>
          )}
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}
