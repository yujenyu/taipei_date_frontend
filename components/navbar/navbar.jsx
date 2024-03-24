import React from 'react';
import Link from 'next/link';
import { FaBell, FaBookmark } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import {
  BsGlobe2,
  BsChatSquareHeart,
  BsTicketPerforated,
} from 'react-icons/bs';
import { BiSolidDrink } from 'react-icons/bi';
import { FiCalendar } from 'react-icons/fi';
import { Logo } from './logo';

export default function Header() {
  const login = true;
  // const login = false;
  return (
    <>
      <div className="sticky top-0 z-50 navbar bg-dark w-full ">
        <div className="navbar-start ml-3">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="hidden navbar-center md:flex">
          <ul className="px-0 menu menu-horizontal">
            <li>
              <Link
                className="text-base sm:text-sm text-light hover:shadow-xl3 hover:text-neongreen sm:px-1 md:px-4 lg:px-8"
                href="/account-center/account-index"
              >
                配對交友
              </Link>
            </li>
            <li>
              <Link
                className="text-base text-light hover:shadow-xl3 hover:text-neongreen sm:text-sm sm:px-1 md:px-4 lg:px-8"
                href="/community"
              >
                社群媒體
              </Link>
            </li>
            <li>
              <Link
                className="text-base text-light hover:shadow-xl3 hover:text-neongreen sm:text-sm sm:px-1 md:px-4 lg:px-8"
                href="#"
              >
                行程規劃
              </Link>
            </li>
            <li>
              <Link
                className="text-base text-light hover:shadow-xl3 hover:text-neongreen sm:text-sm sm:px-1 md:px-4 lg:px-8"
                href="#"
              >
                酒吧探索
              </Link>
            </li>
            <li>
              <Link
                className="text-base text-light hover:shadow-xl3 hover:text-neongreen sm:text-sm sm:px-1 md:px-4 lg:px-8"
                href="#"
              >
                電影探索
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-bottom dropdown-end">
            <button className=" btn-ghost btn-circle btn hover:shadow-xl3">
              <Link
                className="flex justify-center text-2xl text-light hover:shadow-xl3 hover:text-neongreen align-middle"
                href="#"
              >
                <FaBell />
              </Link>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 h-3/4 text-h6"
              // fixed dropdown menu to top right
              style={{ position: 'fixed', right: '30px', top: '70px' }}
            >
              <li>
                <a>Noti 1</a>
              </li>
              <li>
                <a>Noti 2</a>
              </li>
              <li>
                <a>Noti 3</a>
              </li>
              <li>
                <a>Noti 4</a>
              </li>
              <li>
                <a>Noti 5</a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-bottom dropdown-end">
            <button className=" btn-ghost btn-circle btn hover:shadow-xl3">
              <Link
                className="flex justify-center text-2xl text-light hover:shadow-xl3 hover:text-neongreen align-middle"
                href="#"
              >
                <FaBookmark />
              </Link>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 h-3/4 text-h6"
              // fixed dropdown menu to top right
              style={{ position: 'fixed', right: '30px', top: '70px' }}
            >
              <li>
                <a>Bookmark 1</a>
              </li>
              <li>
                <a>Bookmark 2</a>
              </li>
              <li>
                <a>Bookmark 3</a>
              </li>
              <li>
                <a>Bookmark 4</a>
              </li>
              <li>
                <a>Bookmark 5</a>
              </li>
            </ul>
          </div>

          <div
            className={`dropdown dropdown-end ${login ? 'hidden ' : ' block'}`}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:shadow-xl3"
            >
              <MdAccountCircle className="text-3xl align-middle text-light" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content border-1 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>登入</a>
              </li>
              <li>
                <a>註冊</a>
              </li>
            </ul>
          </div>

          <div
            className={`dropdown dropdown-end ${login ? ' block' : ' hidden'}`}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:shadow-xl3"
            >
              <div className="w-6 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content border-1 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li> */}
              <li>
                <Link href="/account-center/account-index">會員中心</Link>
              </li>
              <li>
                <a>玩遊戲</a>
              </li>
              <li>
                <a>登出</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom navbar for mobile */}
      <div className="z-50 h-16 bg-dark btm-nav btm-nav-sm md:hidden w-full">
        <button className="hover:active ">
          <Link
            className="text-xs text-light sm:px-0.5 lg:px-8 flex flex-col items-center"
            href="#"
          >
            <BsChatSquareHeart className="text-h4 mb-1" />
            <span className="text-p">配對交友</span>
          </Link>
        </button>
        <button className="hover:active ">
          <Link
            className="text-xs text-light sm:px-0.5 lg:px-8 flex flex-col items-center"
            href="/community"
          >
            <BsGlobe2 className="text-h4 mb-1" />
            <span className="text-p">社群媒體</span>
          </Link>
        </button>
        <button className="hover:active ">
          <Link
            className="text-xs text-light sm:px-0.5 lg:px-8 flex flex-col items-center"
            href="#"
          >
            <FiCalendar className="text-h4 mb-1" />
            <span className="text-p">行程規劃</span>
          </Link>
        </button>
        <button className="hover:active ">
          <Link
            className="text-xs text-light sm:px-0.5 lg:px-8 flex flex-col items-center"
            href="#"
          >
            <BiSolidDrink className="text-h4 mb-1" />
            <span className="text-p">酒吧探索</span>
          </Link>
        </button>
        <button className="hover:active ">
          <Link
            className="text-xs text-light sm:px-0.5 lg:px-8 flex flex-col items-center"
            href="#"
          >
            <BsTicketPerforated className="text-h4 mb-1" />
            <span className="text-p">電影探索</span>
          </Link>
        </button>
      </div>
    </>
  );
}
