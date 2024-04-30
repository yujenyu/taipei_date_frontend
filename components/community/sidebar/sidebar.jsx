import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePostContext } from '@/context/post-context';
import { FiHome, FiSearch, FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { FaRegSquarePlus } from 'react-icons/fa6';
import SearchModal from '../modal/searchModal';
import CreateEventModal from '../modal/createEventModal';
import CreateModal from '../modal/createModal';
import styles from '../modal/modal.module.css';

export default function Sidebar() {
  const { auth } = useAuth();

  const router = useRouter();

  const {
    isHoverActive,
    setIsHoverActive,
    setProfilePosts,
    setProfilePage,
    setUserProfileHasMore,
    setReload,
    setIsFilterActive,
    setFilteredPosts,
    setFilteredPage,
    setActiveFilterButton,
    searchModalRef,
  } = usePostContext();

  const userId = auth.id;

  const isActive = (pathname) => {
    // 使用正則表達式來檢查路由是否匹配 /community/profile/ 加上任何數字的模式
    if (pathname === '/community/profile') {
      return router.pathname.startsWith('/community/profile/');
    }
    return router.pathname === pathname;
  };

  const handleSearchClick = () => {
    setIsHoverActive(false);
    searchModalRef.current.showModal();
  };

  const showCreateModal = (modalId) => {
    setIsHoverActive(false);
    document.getElementById(modalId).showModal();
  };

  const handleProfileClick = async () => {
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

  const handleHomeClick = () => {
    // 重置過濾狀態
    setIsFilterActive(false);
    setFilteredPosts([]);
    setFilteredPage(1);
    setActiveFilterButton(false);

    // 導航到指定路由，如果已經在該路由，這行將觸發頁面重載
    router.push(`/community`);
  };

  return (
    <>
      <div className="sidebar ml-8 right-6 hidden md:flex md:w-2/12 top-[112px] left-0 fixed">
        <div className="sidebarWrapper">
          <ul className="sidebarList grid">
            <li
              className={`${
                isActive('/community') ? 'text-neongreen' : ''
              } sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen`}
              onClick={() => {
                handleHomeClick();
              }}
            >
              <FiHome className="sidebarIcon text-h3 mr-5 md:flex sm:hidden" />
              <span className="sidebarListItemText text-h6 lg:flex md:hidden">
                首頁
              </span>
            </li>

            <li
              className={`sidebarListItem flex items-center mb-8 p-2 cursor-pointer ${
                isHoverActive
                  ? 'hover:bg-gray-800 rounded-[20px] hover:text-neongreen'
                  : ''
              }`}
              onClick={handleSearchClick}
            >
              <FiSearch className="sidebarIcon text-h3 mr-5 " />
              <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                搜尋
              </span>
              <SearchModal />
            </li>

            <Link href="/community/explore">
              <li
                className={`${
                  isActive('/community/explore') ? 'text-neongreen' : ''
                } sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen`}
              >
                <MdOutlineExplore className="sidebarIcon text-h3 mr-5" />
                <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                  探索
                </span>
              </li>
            </Link>

            {userId !== 0 && userId !== null && (
              <li
                className={`sidebarListItem flex items-center mb-8 p-2 cursor-pointer ${
                  isHoverActive
                    ? 'hover:bg-gray-800 rounded-[20px] hover:text-neongreen'
                    : ''
                }`}
              >
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    className="flex items-center w-full text-left"
                  >
                    <FaRegSquarePlus className="sidebarIcon text-h3 mr-5" />
                    <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                      建立
                    </span>
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
                        className={`${styles['createModalListItemText']}`}
                        onClick={() => showCreateModal('create_modal')}
                      >
                        建立貼文
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles['createModalListItemText']}`}
                        onClick={() => showCreateModal('create_event_modal')}
                      >
                        建立活動
                      </a>
                    </li>
                  </ul>
                </div>
                <CreateModal />
                <CreateEventModal />
              </li>
            )}

            <Link href="/community/events">
              <li
                className={`${
                  isActive('/community/events') ? 'text-neongreen' : ''
                } sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen`}
              >
                <FiCalendar className="sidebarIcon text-h3 mr-5" />
                <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                  活動
                </span>
              </li>
            </Link>

            {userId !== 0 && userId !== null && (
              <li
                className={`${
                  isActive('/community/profile') ? 'text-neongreen' : ''
                } sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen cursor-pointer`}
                onClick={() => handleProfileClick()}
              >
                <FiUser className="sidebarIcon text-h3 mr-5" />
                <span className="sidebarListItemTe text-h6 lg:inline md:hidden">
                  個人檔案
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
