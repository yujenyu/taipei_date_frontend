import Link from 'next/link';
import {
  BsFillPersonFill,
  BsCreditCard2FrontFill,
  BsFillKeyFill,
  BsDpadFill,
  BsCashCoin,
  BsCollection,
} from 'react-icons/bs';
import { useAuth } from '@/context/auth-context';

export default function Sidebar({ currentPage }) {
  const { auth } = useAuth();

  return (
    <>
      <div className="*//drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="w-64 min-h-full bg-dark py-28 pe-4 ps-4 sm:w-36 lg:w-80 sm:py-12 sm:ps-18 sm:pe-0 md:ps-12 md:w-44 lg:ps-44 xl:w-96 xl:ps-60 menu text-base-content">
            {/* Sidebar content here */}
            <li className="mt-3 border-b border-solid sm:mt-0 menu-title">
              <p className="text-2xl text-light">會員中心</p>
            </li>
            <li className="hover:text-neongreen">
              <Link
                className={`${
                  currentPage === '個人資料' ? 'text-neongreen' : ''
                } text-base`}
                href={`/account/index/${auth.id}`}
              >
                <BsFillPersonFill />
                個人資料
              </Link>
            </li>
            <li className="hover:text-neongreen">
              <Link
                className={`${
                  currentPage === '資料編輯' ? 'text-neongreen' : ''
                } text-base`}
                href={`/account/edit/${auth.id}`}
              >
                <BsCreditCard2FrontFill />
                資料編輯
              </Link>
            </li>
            <li className="hover:text-neongreen">
              <Link
                className={`${
                  currentPage === '更改密碼' ? 'text-neongreen' : ''
                } text-base`}
                href={`/account/password-change/${auth.id}`}
              >
                <BsFillKeyFill />
                更改密碼
              </Link>
            </li>
            <li className="hover:text-neongreen">
              <Link
                className={`${
                  currentPage === '遊玩遊戲' ? 'text-neongreen' : ''
                } text-base`}
                href={`/account/play-game/${auth.id}`}
              >
                <BsDpadFill />
                遊玩遊戲
              </Link>
            </li>
            <li className="hover:text-neongreen">
              <Link
                className={`${
                  currentPage === '紀錄查詢' ? 'text-neongreen' : ''
                } text-base`}
                href={`/account/record/${auth.id}`}
              >
                <BsCashCoin />
                紀錄查詢
              </Link>
            </li>
            <li className="hover:text-neongreen">
              <Link
                className={`${
                  currentPage === '個人收藏' ? 'text-neongreen' : ''
                } text-base`}
                href={`/account/collect/${auth.id}`}
              >
                <BsCollection />
                個人收藏
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
