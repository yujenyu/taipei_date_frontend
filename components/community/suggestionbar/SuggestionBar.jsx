import { useState, useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import { useRouter } from 'next/router';

export default function SuggestionBar() {
  const { setProfilePosts, setProfilePage, setUserProfileHasMore } =
    usePostContext();

  const router = useRouter();

  const [users, setUsers] = useState([]);

  const getSuggestUsers = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/community/getSuggestUsers`
      );
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
    }
  };

  const handleUserClick = (userId) => {
    // 清空當前貼文列表和重置頁碼以確保載入新用戶的貼文
    setProfilePosts([]);
    setProfilePage(1);
    setUserProfileHasMore(true);

    router.push(`/community/profile/${userId}`);
  };

  useEffect(() => {
    getSuggestUsers();
  }, []);

  return (
    <>
      <div className="recbarWrapper">
        <div className="recbarListTitle flex mb-5 p-2">推薦用戶</div>
        <ul className="recbarList grid ">
          {users.map((user, i) => (
            <li
              key={i}
              className="recbarListItem flex mb-3 p-2 gap-3 items-center"
            >
              <div
                className="avatar cursor-pointer"
                onClick={() => handleUserClick(user.user_id)}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.avatar || '/unknown-user-image.jpg'}
                    alt={user.username || 'No Image Available'}
                  />
                </div>
              </div>
              <span
                className="recbarListItemText text-h6 cursor-pointer hover:text-primary"
                onClick={() => handleUserClick(user.user_id)}
              >
                {/* 處理從 member_user 拿到的 email, 僅保留 @ 之前的 id */}
                {user.email ? user.email.split('@')[0] : 'Unknown User'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
