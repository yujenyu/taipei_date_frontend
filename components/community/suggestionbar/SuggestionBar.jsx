import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SuggestionBar() {
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
              <Link href={`/community/profile/${user.user_id}`}>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.avatar || '/unknown-user-image.jpg'}
                      alt={user.username || 'No Image Available'}
                    />
                  </div>
                </div>
              </Link>
              <Link href={`/community/profile/${user.user_id}`}>
                <span className="recbarListItemText text-h6">
                  {/* 處理從 member_user 拿到的 email, 僅保留 @ 之前的 id */}
                  {user.email ? user.email.split('@')[0] : 'Unknown User'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
