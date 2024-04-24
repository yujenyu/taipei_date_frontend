import { useAuth } from '@/context/auth-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CreateModalMobile from '../modal/createModalMobile';
import SearchModalMobile from '../modal/searchModalMobile';
import CreateEventModalMobile from '../modal/createEventModalMobile';

export default function TabbarMobile() {
  const { auth } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  const userId = auth.id;

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
          className="tab"
          onClick={() => {
            // handleTabClick('search');
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

        {userId !== 0 && userId !== null && (
          <div
            role="tab"
            // className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
            className="tab"
          >
            <div className="dropdown">
              <div tabIndex={0}>
                <span>建立</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                }}
              >
                <li>
                  <a
                    onClick={() => {
                      // handleTabClick('create');
                      document
                        .getElementById('create_modal_mobile')
                        .showModal();
                    }}
                  >
                    建立貼文
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      document
                        .getElementById('create_event_modal_mobile')
                        .showModal()
                    }
                  >
                    建立活動
                  </a>
                </li>
              </ul>
            </div>
            <CreateModalMobile />
            <CreateEventModalMobile />
          </div>
        )}

        <Link
          role="tab"
          className={`tab ${activeTab === 'events' ? 'tab-active' : ''}`}
          href="/community/events"
          onClick={() => handleTabClick('events')}
        >
          <span>活動</span>
        </Link>

        {userId !== 0 && userId !== null && (
          <Link
            role="tab"
            className={`tab ${activeTab === 'profile' ? 'tab-active' : ''}`}
            href={`/community/profile/${userId}`}
            onClick={() => handleTabClick('profile')}
          >
            <span>個人</span>
          </Link>
        )}
      </div>
    </>
  );
}
