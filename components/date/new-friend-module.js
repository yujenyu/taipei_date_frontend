import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import SelectBtn from '@/components/date/select-btn';
import { DATE_GET_FRIENDS_LIST } from '../config/api-path';
import toast from 'react-hot-toast';
import { useDate } from '@/context/date-context';

export default function NewFriends() {
  // // 假資料
  // const mockData = {
  //   avatar:
  //     'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  //   name: 'Xina',
  //   age: 28,
  //   bar_type: ['運動酒吧'],
  //   movie_type: ['愛情片'],
  //   profile_content:
  //     '熱愛生活，尤其喜歡在風格獨特的酒吧中探索，期待找到能一同分享這份喜好的新朋友。',
  // };

  // TODO:bio,selectedUserId 改成可以不用狀態的方式
  // bios[bioIndex]=bio
  // const bio = bios[bioIndex]

  const [bio, setBio] = useState(null);
  const [bios, setBios] = useState([]);
  const [bioIndex, setBioIndex] = useState(0); //索引值變

  const [selectedUserId, setSelectedUserId] = useState(null); // 新增這個狀態變數來保存 user_id
  const { auth, getAuthHeader } = useAuth();
  const { toggleBar, setToggleBar, toggleMovie, setToggleMovie } = useDate();

  useEffect(() => {
    const userId = auth.id;
    const selectedBarTypeId = toggleBar['id'];
    const selectedMovieTypeId = toggleMovie['id'];
    const getBio = async () => {
      const url = `${DATE_GET_FRIENDS_LIST}/${userId}/${selectedBarTypeId}/${selectedMovieTypeId}`;

      try {
        const res = await fetch(url, { headers: { ...getAuthHeader() } });
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setBio(data.data[0]);
          setBios(data.data);
          setSelectedUserId(data.data[0].user_id); // 將 user_id 存儲到狀態變數中
          console.log(data.data[0]);
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBio();
    // }
  }, []);

  useEffect(() => {
    if (bioIndex < bios.length) {
      setSelectedUserId(bios[bioIndex].user_id);
      setBio(bios[bioIndex]);
    }
  }, [bioIndex]);

  const handleAcceptClick = async () => {
    if (!selectedUserId) {
      console.log('Selected user id is not available yet');
      return;
    }
    const response = await fetch(`${DATE_GET_FRIENDS_LIST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        user_id1: auth.id,
        user_id2: selectedUserId,
        friendship_status: 'accepted',
      }),
    });
    // 在成功更新後重新獲取資料
    if (response.ok) {
      const data = await response.json();
      //if (data.success && data.data.length > 0) {
      // setBio(data.data[0]);
      toast.success('好友已送出！', { duration: 1500 });
      setBioIndex(bioIndex + 1);

      // setSelectedUserId(data.data[0].user_id);
      //} else {
      //console.log(data.msg);
      // }
    } else {
      console.error('Failed to update data');
    }
  };

  const handleRejectClick = async () => {
    if (!selectedUserId) {
      console.log('Selected user id is not available yet');
      return;
    }
    const response = await fetch(`${DATE_GET_FRIENDS_LIST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        user_id1: auth.id,
        user_id2: selectedUserId,
        friendship_status: 'rejected',
      }),
    });
    // 在成功更新後重新獲取資料
    if (response.ok) {
      const data = await response.json();
      //if (data.success && data.data.length > 0) {
      // setBio(data.data[0]);
      toast.success('好友已拒絕！', { duration: 1500 });
      setBioIndex(bioIndex + 1);

      // setSelectedUserId(data.data[0].user_id);
      //} else {
      //console.log(data.msg);
      // }
    } else {
      console.error('Failed to update data');
    }
  };

  if (!bio) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">今日新朋友</h1>
      <div>
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-64 h-64 border-3 border-green-500 rounded-lg"
            src={bio.avatar}
            alt={`會員照片 ${bio.username}`}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-[20px]">
          <p className="mb-3 text-lg md:text-lg sm:text-base">{`${bio.username}，${bio.age}`}</p>
          <p className="mb-3 text-lg md:text-lg sm:text-base">
            {bio.bar_type_name}、{bio.movie_type}
          </p>
          <p className="mb-6 text-center text-lg md:text-lg sm:text-base">
            {bio.profile_content}
          </p>
        </div>
      </div>
      <SelectBtn
        onAcceptClick={handleAcceptClick} // 接受
        onRejectClick={handleRejectClick} // 拒絕
      />
    </div>
  );
}
