import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';

export default function Friends() {
  // 假資料
  // const mockDataList = [
  //   {
  //     avatar:
  //       'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  //     username: 'Xina',
  //   },
  //   {
  //     avatar:
  //       'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  //     username: 'John',
  //   },
  //   // 可以添加更多朋友資料
  // ];

  // TODO: `http://localhost:3001/friends-list/accepted/${userid1}`，依照登入使用者變動
  const [friend, setFriend] = useState([]);
  const { auth, getAuthHeader } = useAuth();
  const getFriend = async () => {
    try {
      const url = `http://localhost:3001/date/friends-list/accepted/${auth.id}`;
      const res = await fetch(url, { headers: { ...getAuthHeader() } });
      console.log('res', res);
      const data = await res.json();
      console.log('date', data);

      if (Array.isArray(data.data)) {
        setFriend(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFriend();
  }, [auth.id]);

  return (
    <>
      {friend.map((friend, index) => (
        <Link
          href={`/date/chat-room-context/${friend.friendship_id}`}
          key={index}
        >
          <div
            key={index}
            className="flex justify-start items-center md:mt-4 w-400 md:w-full gap-6"
          >
            <img
              className="w-16 h-16 md:w-20 md:h-20 border-3 border-green-500 rounded-full"
              src={friend.user_id2_avatar}
              alt="會員照片"
            />
            <p className="ml-4">{friend.user_id2_name}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
