import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CreateModalMobile from '../modal/createModalMobile';
import SearchModalMobile from '../modal/searchModalMobile';

export default function TabbarMobile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  // 使用URL變化來設置活動標籤
  useEffect(() => {
    const path = router.pathname.split('/')[2]; // 獲取 /community/ 後的路徑
    setActiveTab(path || 'home'); // 沒有路徑即為 home page
  }, [router.pathname]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div
        role="tablist"
        className="tabs tabs-bordered md:hidden z-40 bg-dark fixed top-16 w-full h-8"
      >
        <Link
          role="tab"
          className={`tab ${activeTab === 'home' ? 'tab-active' : ''}`}
          href="/community"
          onClick={() => handleTabClick('home')}
        >
          <span>首頁</span>
        </Link>
        <a
          role="tab"
          className={`tab ${activeTab === 'search' ? 'tab-active' : ''}`}
          onClick={() => {
            handleTabClick('search');
            document.getElementById('search_modal_mobile').showModal();
          }}
        >
          <span>搜尋</span>
          <SearchModalMobile />
        </a>
        <Link
          role="tab"
          className={`tab ${activeTab === 'explore' ? 'tab-active' : ''}`}
          href="/community/explore"
          onClick={() => handleTabClick('explore')}
        >
          <span>探索</span>
        </Link>
        <a
          role="tab"
          className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
          onClick={() => {
            handleTabClick('create');
            document.getElementById('create_modal_mobile').showModal();
          }}
        >
          <span>建立</span>
          <CreateModalMobile />
        </a>
        <Link
          role="tab"
          className={`tab ${activeTab === 'events' ? 'tab-active' : ''}`}
          href="/community/events"
          onClick={() => handleTabClick('events')}
        >
          <span>活動</span>
        </Link>
        <Link
          role="tab"
          className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
          href="/community/profile"
          onClick={() => handleTabClick('profile')}
        >
          <span>個人</span>
        </Link>
      </div>
    </>
  );
}
