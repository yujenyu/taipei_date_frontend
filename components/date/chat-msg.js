import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { DATE_FRIENDSHIPS_MESSAGE_SENDER } from '../config/api-path';

export default function ChatMsg({ msgs }) {
  // 假資料
  // const mockDataList = [
  //   {
  //     profile_picture_url:
  //       'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  //     sender_name: 'Xina',
  //     content: 'Hello!你也喜歡去酒吧嗎？',
  //     sended_at: '16:35',
  //   },
  //   {
  //     profile_picture_url:
  //       'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  //     sender_name: 'Xina',
  //     content: 'Hello!你也喜歡去酒吧嗎？',
  //     sended_at: '16:35',
  //   },
  // ];

  //TODO: `http://localhost:3001/date/friendships_message/sender_id/${userid1}`，依照登入使用者變動
  const [msg, setMsg] = useState([]);
  const { auth, getAuthHeader } = useAuth();
  const getMsg = async () => {
    const url = `${DATE_FRIENDSHIPS_MESSAGE_SENDER}/${auth.id}`;
    try {
      const res = await fetch(url, { headers: { ...getAuthHeader() } });
      console.log('res', res);
      const data = await res.json();
      console.log('date', data);

      if (Array.isArray(data.data)) {
        setMsg(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMsg();
  }, []);

  return (
    <>
      {msg.map((msg, index) => (
        <Link href={`/date/chat-room-context/${msg.friendship_id}`} key={index}>
          <div className="flex items-center mx-4 mb-6 gap-2">
            <img
              className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-4"
              src={msg.avatar}
              alt="會員照片"
            />

            <div className="flex flex-col flex-grow">
              <p className="text-xs md:text-base">{msg.sender_name}</p>
              <p
                className="text-xs md:text-base truncate"
                style={{ width: '15em' }}
              >
                {msg.content}
              </p>
            </div>

            <div className="mr-8 text-right md:text-left ml-8 flex flex-col justify-start items-start">
              <p className="text-xs md:text-xs">{msg.sended_at}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
