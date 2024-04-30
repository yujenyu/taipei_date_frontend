import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import FollowerModal from '../modal/followerModal';
import FollowingModal from '../modal/followingModal';

export default function ProfileInfo() {
  const { auth } = useAuth();
  const { following, handleFollowClick } = usePostContext();

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);

  const userId = auth.id;

  const router = useRouter();
  const { uid } = router.query;

  // 基於 post_id 的唯一 edit modal id
  const followerModalId = `follower_modal_${userId}`;

  // 基於 post_id 的唯一 edit modal id
  const followingModalId = `following_modal_${userId}`;

  // 是否追蹤當前瀏覽的用戶的資訊
  const isFollowing = following[uid] || false;

  const getFollowUsers = async () => {
    if (!uid) return;
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-follows/${uid}`
      );
      const data = await res.json();
      data.forEach((item) => {
        if (item.relation_type === 'followers') {
          setFollowersCount(item.count);
        } else if (item.relation_type === 'following') {
          setFollowingCount(item.count);
        }
      });
    } catch (error) {
      console.error('Failed to fetch follows', error);
    }
  };

  const getPostsCount = async () => {
    if (!uid) return;
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-count-posts/${uid}`
      );
      const data = await res.json();
      setPostsCount(data[0].PostCount);
    } catch (error) {
      console.error('Failed to fetch post count', error);
    }
  };

  const getUserInfo = async () => {
    if (!uid) return;
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-userInfo/${uid}`
      );
      const data = await res.json();
      // 確保即使 data[0] 為 undefined，也能安全地設置一個空對象
      setUserInfo(data[0] || {});
    } catch (error) {
      console.error('Failed to fetch user info', error);
      setUserInfo({}); // 當請求失敗時，也設置一個空對象
    }
  };

  const getFollowers = async () => {
    if (!uid) return;
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-followers/${uid}`
      );
      const data = await res.json();
      setUserFollowers(data); // 更新 userFollowers 狀態
    } catch (error) {
      console.error('Failed to fetch user followers', error);
      setUserFollowers([]); // 當請求失敗時，也設置一個空對象
    }
  };

  const getFollowings = async () => {
    if (!uid) return;
    try {
      const res = await fetch(
        `http://localhost:3001/community/get-followings/${uid}`
      );
      const data = await res.json();
      setUserFollowings(data); // 更新 userFollowings 狀態
    } catch (error) {
      console.error('Failed to fetch user followings', error);
      setUserFollowings([]); // 當請求失敗時，也設置一個空對象
    }
  };

  useEffect(() => {
    if (auth.id) {
      getFollowUsers();
      getPostsCount();
      getUserInfo();
      getFollowers();
      getFollowings();
    }
  }, [uid]);

  return (
    <>
      <div className="w-full flex items-center justify-center px-8 py-5">
        <div className="flex flex-col sm:flex-row justify-center gap-2 w-full flex-grow">
          {/* Profile avatar */}
          <div className="basis-3/12 flex items-center justify-center">
            <div className="avatar">
              <div className="w-32 rounded-full">
                <img
                  src={userInfo.avatar || '/unknown-user-image.jpg'}
                  alt={userInfo.username || 'No Image Available'}
                />
              </div>
            </div>
          </div>
          {/* Profile info */}
          <div className="basis-8/12 flex flex-col justify-between item-center gap-2 w-full flex-grow">
            <div className="flex items-center">
              <div className="userId">
                {userInfo.email ? userInfo.email.split('@')[0] : 'unknownuser'}
              </div>
              <div className="flex mx-10">
                {/* 確保個人頁面不顯示追蹤功能, 轉換 uid 從字符串到數字，以保持類型一致 */}
                {uid && userId !== parseInt(uid, 10) && (
                  <button
                    className="btn bg-dark border-white rounded-full text-white hover:shadow-xl3 hover:text-primary"
                    onClick={() => handleFollowClick(uid)}
                  >
                    {isFollowing ? '追蹤中' : '追蹤'}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2 whitespace-nowrap">
              <div className="basis-1/3">{postsCount} 貼文</div>
              <div
                className="basis-1/3 cursor-pointer"
                onClick={() =>
                  document.getElementById(followerModalId).showModal()
                }
              >
                {followersCount} 追蹤者
              </div>
              <div
                className="basis-1/3 cursor-pointer"
                onClick={() =>
                  document.getElementById(followingModalId).showModal()
                }
              >
                {followingCount} 追蹤中
              </div>
              <FollowerModal
                followers={userFollowers}
                modalId={followerModalId}
                key={`follower-${uid}`}
              />
              <FollowingModal
                followings={userFollowings}
                modalId={followingModalId}
                key={`following-${uid}`}
              />
            </div>

            <div className="flex items-center">{userInfo.profile_content}</div>
          </div>
        </div>
      </div>
    </>
  );
}
