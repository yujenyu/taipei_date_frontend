import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProfileInfo({ posts }) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [userInfo, setUserInfo] = useState('');
  const router = useRouter();
  const { uid } = router.query;

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
      setUserInfo(data[0]);
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
  };

  useEffect(() => {
    getFollowUsers();
    getPostsCount();
    getUserInfo();
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
              {userInfo.email ? userInfo.email.split('@')[0] : 'unknownuser'}
            </div>
            <div className="flex flex-row justify-center items-center gap-2 whitespace-nowrap">
              <div className="basis-1/3">{postsCount} 貼文</div>
              <div className="basis-1/3">{followersCount} 追蹤者</div>
              <div className="basis-1/3">{followingCount} 追蹤中</div>
            </div>

            <div className="flex items-center">
              {/* {
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe velit dolores accusamus rem delectus laboriosam dignissimos alias. Animi, maxime! Ipsa laboriosam asperiores incidunt reprehenderit laborum vitae eveniet facilis error perspiciatis! '
              } */}
              {userInfo.profile_content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
