import { FiHome, FiSearch, FiCalendar, FiUser } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { FaRegSquarePlus } from 'react-icons/fa6';

export default function Sidebar() {
  return (
    <>
      <div className="sidebar fixed left-6 top-[110px]">
        <div className="sidebarWrapper">
          <ul className="sidebarList grid">
            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px]">
              <FiHome className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6">首頁</span>
            </li>

            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px]">
              <FiSearch className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6">搜尋</span>
            </li>

            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px]">
              <MdOutlineExplore className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6">探索</span>
            </li>

            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px]">
              <FaRegSquarePlus className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6">建立</span>
            </li>

            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px]">
              <FiCalendar className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemText text-h6">活動</span>
            </li>

            <li className="sidebarListItem flex items-center mb-8 p-2 hover:bg-gray-800 rounded-[20px]">
              <FiUser className="sidebarIcon text-h3 mr-5" />
              <span className="sidebarListItemTe text-h6">個人檔案</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
