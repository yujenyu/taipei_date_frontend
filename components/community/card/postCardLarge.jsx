import { useState } from 'react';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function PostCardLarge() {
  const mockData = {
    userId: 'USERID',
    context:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur corrupti aspernatur quas Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur corrupti aspernatur quas',
  };
  const [isLiked, setIsLiked] = useState(false);

  const handleLikedClick = () => {
    setIsLiked(!isLiked);
  };

  const [isSaved, setIsSaved] = useState(false);

  const handleSavedClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <>
      <div className="card max-w-[480px] h-[700px] overflow-hidden flex border border-grayBorder">
        <div className="card-user h-10 flex items-center gap-2 m-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <span>{mockData.userId}</span>
        </div>
        <figure className="card-photo m-0" onDoubleClick={handleLikedClick}>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
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

              <FiMessageCircle className="card-icon hover:text-neongreen" />
              <FiSend className="card-icon hover:text-neongreen" />
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
          <p className="context">{mockData.context}</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}
