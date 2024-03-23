import { FiHome, FiSearch, FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { FaRegSquarePlus } from 'react-icons/fa6';
import SearchModal from '../modal/searchModal';
import CreateModal from '../modal/createModal';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <>
      <div className="recbar mt-8 ml-8 right-6 hidden md:flex lg:w-48">
        <div className="sidebarWrapper">
          <ul className="sidebarList grid">
            <Link href="/community">
              <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen">
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
              <SearchModal />
            </li>

            <Link href="/community/explore">
              <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen">
                <MdOutlineExplore className="sidebarIcon text-h3 mr-5" />
                <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                  探索
                </span>
              </li>
            </Link>

            <li
              className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen"
              onClick={() =>
                document.getElementById('create_modal').showModal()
              }
            >
              <FaRegSquarePlus className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                建立
              </span>
              <CreateModal />
            </li>

            <Link href="/community/events">
              <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen">
                <FiCalendar className="sidebarIcon text-h3 mr-5" />
                <span className="sidebarListItemText text-h6 lg:inline md:hidden">
                  活動
                </span>
              </li>
            </Link>

            <Link href="/community/profile">
              <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px] hover:text-neongreen">
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
