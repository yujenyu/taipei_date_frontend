import { useState } from 'react';
import Link from 'next/link';

export default function Recomendbar({ onTabChange }) {
  const changeTab = (newTab) => {
    onTabChange(newTab); // 'addBar' 或 'addMovie'
  };

  // 狀態管理，看選擇的是“我的收藏”還是“熱門推薦”
  const [selectedTab, setSelectedTab] = useState('favorites');

  // render “我的收藏” 的內容
  const renderFavorites = () => (
    <div className="flex justify-start items-start gap-3.5">
      {/* <Link href="#" legacyBehavior>
        <a className="text-white text-xs sm:text-lg px-4 sm:px-7 py-1 bg-[#ff03ff]  rounded-full  border  border-white  flex justify-center items-center ">
          所有收藏
        </a>
      </Link> */}
      <Link href="#" legacyBehavior>
        <a
          className="text-black  text-xs sm:text-lg px-4 sm:px-7 py-1 bg-[#a0ff1f] rounded-full border border-black flex justify-center items-center "
          onClick={() => onTabChange('addMovie')}
        >
          收藏的電影
        </a>
      </Link>
      <Link href="#" legacyBehavior>
        <a
          className="text-white  text-xs sm:text-lg px-4 sm:px-7 py-1 bg-black  rounded-full border border-white  flex justify-center items-center "
          onClick={() => onTabChange('addBar')}
        >
          收藏的酒吧
        </a>
      </Link>
    </div>
  );

  // render “熱門推薦” 的內容
  const renderRecommendations = () => (
    <div className="flex justify-start items-start gap-3.5">
      {/* <Link href="#" legacyBehavior>
        <a className="text-white text-xs sm:text-lg px-4 sm:px-7 py-1 bg-[#ff03ff]  rounded-full  border  border-white  flex justify-center items-center ">
          熱門行程
        </a>
      </Link> */}
      <Link href="#" legacyBehavior>
        <a
          className="text-black  text-xs sm:text-lg px-4 sm:px-7 py-1 bg-[#a0ff1f] rounded-full border border-black flex justify-center items-center "
          onClick={() => onTabChange('addMovie')}
        >
          熱門的電影
        </a>
      </Link>
      <Link href="#" legacyBehavior>
        <a
          className="text-white  text-xs sm:text-lg px-4 sm:px-7 py-1 bg-black  rounded-full border border-white  flex justify-center items-center "
          onClick={() => onTabChange('addBar')}
        >
          熱門的酒吧
        </a>
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <div className="flex justify-center items-center gap-12">
        <div
          className={`pb-1 border-b-2 ${
            selectedTab === 'favorites' ? 'border-[#a0ff1f]' : ''
          } hover:border-[#a0ff1f] flex justify-center items-center cursor-pointer`}
          onClick={() => setSelectedTab('favorites')}
        >
          <div className="text-white text-lg sm:text-2xl font-normal">
            我的收藏
          </div>
        </div>
        <div
          className={`pb-1 border-b-2 ${
            selectedTab === 'recommendations' ? 'border-[#a0ff1f]' : ''
          } hover:border-[#a0ff1f] flex justify-center items-center cursor-pointer`}
          onClick={() => setSelectedTab('recommendations')}
        >
          <div className="text-white text-lg sm:text-2xl font-normal">
            熱門推薦
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start gap-3.5">
        {/* 根據狀態決定顯示哪個內容 */}
        {selectedTab === 'favorites' && renderFavorites()}
        {selectedTab === 'recommendations' && renderRecommendations()}
      </div>
    </div>
  );
}
