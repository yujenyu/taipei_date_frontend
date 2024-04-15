import { useState, useEffect } from 'react';

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
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <span className="recbarListItemText text-h6">{user.user_id}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
