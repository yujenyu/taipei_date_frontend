import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CreateModalMobile from '../modal/createModalMobile';
import SearchModalMobile from '../modal/searchModalMobile';
import CreateEventModalMobile from '../modal/createEventModalMobile';

export default function TabbarMobile() {
  const { auth } = useAuth();
  const router = useRouter();

  const {
    setIsFilterActive,
    setFilteredPosts,
    setFilteredPage,
    setProfilePosts,
    setProfilePage,
    setUserProfileHasMore,
    setActiveFilterButton,
    setReload,
  } = usePostContext();

  const [activeTab, setActiveTab] = useState('home');

  const userId = auth.id;

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleHomeClick = (tabName) => {
    setActiveTab(tabName);

    // 重置過濾狀態
    setIsFilterActive(false);
    setFilteredPosts([]);
    setFilteredPage(1);
    setActiveFilterButton(false);

    // 導航到指定路由，如果已經在該路由，這行將觸發頁面重載
    router.push(`/community`);
  };

  const handleProfileClick = async (tabName) => {
    setActiveTab(tabName);

    // 清空當前貼文列表和重置頁碼以確保載入新用戶的貼文
    setProfilePosts([]);
    setProfilePage(1);
    setUserProfileHasMore(true);

    if (router.query.uid === userId.toString()) {
      // 如果用戶點擊的是已經在的個人檔案頁面，則強制觸發更新
      setReload((prev) => !prev); // 切換 forceUpdate 狀態
    } else {
      router.push(`/community/profile/${userId}`); // 導向新的用戶檔案
    }
  };

  // 使用URL變化來設置活動標籤
  useEffect(() => {
    const path = router.pathname.split('/')[2]; // 獲取 /community/ 後的路徑
    setActiveTab(path || 'home'); // 沒有路徑即為 home page
  }, [router.pathname]);

  return (
    <>
      <div
        role="tablist"
        className="tabs tabs-bordered md:hidden bg-dark fixed top-16 w-full h-8 z-50"
      >
        <li
          role="tab"
          className={`tab ${activeTab === 'home' ? 'tab-active' : ''}`}
          href="/community"
          onClick={() => handleHomeClick('home')}
        >
          <span>首頁</span>
        </li>
        <li
          role="tab"
          className="tab"
          onClick={() => {
            // handleTabClick('search');
            document.getElementById('search_modal_mobile').showModal();
          }}
        >
          <span>搜尋</span>
          <SearchModalMobile />
        </li>
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
            onClick={() => handleProfileClick('profile')}
          >
            <span>個人</span>
          </Link>
        )}
      </div>
    </>
  );
}
