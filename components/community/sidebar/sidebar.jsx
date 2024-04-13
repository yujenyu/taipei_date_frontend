import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiSearch, FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { FaRegSquarePlus } from 'react-icons/fa6';
import SearchModal from '../modal/searchModal';
import CreateEventModal from '../modal/createEventModal';
import CreateModal from '../modal/createModal';
import styles from '../modal/modal.module.css';

export default function Sidebar() {
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname === pathname;
  };

  return (
    <>
      <div className="recbar ml-8 right-6 hidden md:flex lg:w-48 top-[112px] left-0 fixed">
        <div className="sidebarWrapper">
          <ul className="sidebarList grid">
            <Link href="/community">
              <li
                className={`${
                  isActive('/community') ? 'text-neongreen' : ''
                } sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen`}
              >
                <FiHome className="sidebarIcon text-h3 mr-5 md:flex sm:hidden" />
                <span className="sidebarListItemText text-h6 lg:flex md:hidden">
                  首頁
                </span>
              </li>
            </Link>

            <li
              className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen"
              onClick={() =>
                document.getElementById('search_modal').showModal()
              }
            >
              <FiSearch className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                搜尋
              </span>
              <SearchModal className={styles['']} />
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

            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen">
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
                      onClick={() =>
                        document.getElementById('create_modal').showModal()
                      }
                    >
                      建立貼文
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${styles['createModalListItemText']}`}
                      onClick={() =>
                        document
                          .getElementById('create_event_modal')
                          .showModal()
                      }
                    >
                      建立活動
                    </a>
                  </li>
                </ul>
              </div>
              <CreateModal />
              <CreateEventModal />
            </li>

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

            <Link href="/community/profile">
              <li
                className={`${
                  isActive('/community/profile') ? 'text-neongreen' : ''
                } sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen`}
              >
                <FiUser className="sidebarIcon text-h3 mr-5" />
                <span className="sidebarListItemTe text-h6 lg:inline md:hidden">
                  個人檔案
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
