import { useEffect, useState } from 'react';
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

  const handleLikedClick = async () => {
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

  const handleReplyClick = () => {
    setShowReply(!showReply);
  };

  useEffect(() => {
    fetchIsLiked();
    fetchIsSaved();
  }, [[post.post_id]]); // 依賴 post.post_id 確保當貼文更新時重新檢查

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
              <button className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 flex justify-center">
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
