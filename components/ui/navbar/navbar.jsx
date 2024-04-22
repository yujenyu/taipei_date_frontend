import { useEffect, useState } from 'react';
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
import { useAuth } from '@/context/auth-context';
import { API_SERVER, ACCOUNT_GET } from '@/components/config/api-path';
import { useRouter } from 'next/router';
import { useNotify } from '@/context/use-notify';
import toast from 'react-hot-toast';

export default function Header({ currentPageTitle }) {
  const {
    auth,
    logout,
    login,
    setLoginModalToggle,
    userAvatar,
    setUserAvatar,
    getAuthHeader,
  } = useAuth();
  const router = useRouter();
  const [dropDownOpen, setDropDownOpen] = useState(false);

  //返回與 page 變量相對應的中文名稱
  function getPageChineseName(page) {
    switch (page) {
      case 'date':
        return '配對交友';
      case 'community':
        return '社群媒體';
      case 'trip':
        return '行程規劃';
      case 'bar':
        return '酒吧探索';
      case 'booking':
        return '電影探索';
      default:
        return page; // 如果找不到匹配，返回原始值
    }
  }

  // const handleAvatarUpdate = () => {
  //   getUserAvatar();
  // };

  useEffect(() => {
    if (auth.id === 0) {
      return;
    }
    const controller = new AbortController(); //建立一個新的控制器
    const signal = controller.signal; //取得訊號 塞到fetch後面
    const getUserAvatar = async () => {
      try {
        const res = await fetch(`${ACCOUNT_GET}/${auth.id}`, {
          headers: { ...getAuthHeader() },
        });
        const result = await res.json();
        // console.log('Navbar, getUserAvatar:', result);
        if (result.success) {
          const { avatar } = result.data;
          setUserAvatar(avatar);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUserAvatar();

    //這裡return abort動作
    return () => {
      controller.abort();
    };
  }, [userAvatar, auth.id]);

  return (
    <>
      {/* <Toaster /> */}
      <div className="fixed top-0 z-50 w-full h-16 navbar bg-dark ;">
        <div className="ml-3 navbar-start">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="hidden navbar-center md:flex">
          <ul className="px-0 menu menu-horizontal">
            {['date', 'community', 'trip', 'bar', 'booking'].map(
              (page, index) => (
                <li key={index}>
                  <Link
                    href={`/${page}`}
                    className={`text-base sm:text-sm text-light hover:shadow-xl3 hover:animate-pulse hover:text-neongreen sm:px-1 md:px-4 lg:px-8 ${
                      currentPageTitle === page ? 'shadow-xl3 text-primary' : ''
                    }`}
                  >
                    {getPageChineseName(page)} {/* 替換為中文名稱 */}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-bottom dropdown-end ">
            <button className=" btn-ghost btn-circle btn hover:shadow-xl3">
              <Link
                className="flex justify-center text-2xl align-middle text-light hover:shadow-xl3 hover:text-neongreen"
                href="#"
              >
                <FaBell />
              </Link>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 h-3/4 text-h6"
              // fixed dropdown menu to top right
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                position: 'fixed',
                right: '30px',
                top: '70px',
              }}
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
                className="flex justify-center text-2xl align-middle text-light hover:shadow-xl3 hover:text-neongreen"
                href="#"
              >
                <FaBookmark />
              </Link>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 h-3/4 text-h6"
              // fixed dropdown menu to top right
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                position: 'fixed',
                right: '30px',
                top: '70px',
              }}
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
            className={`dropdown dropdown-end ${
              auth.id ? 'hidden ' : ' block'
            }`}
          >
            <div
              onClick={() => {
                setLoginModalToggle(true);
              }}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:shadow-xl3 hover:animate-pulse"
            >
              <MdAccountCircle className="text-3xl align-middle text-light" />
            </div>
          </div>

          <div
            className={`dropdown dropdown-end ${
              auth.id ? ' block' : ' hidden'
            }`}
          >
            <div
              onClick={() => setDropDownOpen(!dropDownOpen)}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:shadow-xl3 hover:animate-pulse"
            >
              <div className="w-6 rounded-full ">
                <img
                  width={24}
                  height={24}
                  alt="Tailwind CSS Navbar component"
                  src={
                    userAvatar
                      ? userAvatar
                      : `${API_SERVER}/avatar/defaultAvatar.jpg`
                  }
                />
              </div>
            </div>
            {dropDownOpen && (
              <ul
                tabIndex={0}
                className="menu ease-in duration-300 menu-sm dropdown-content border-1 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="hover:text-neongreen">
                  <Link
                    onClick={() => setDropDownOpen(false)}
                    href={`/account/index/${auth.id}`}
                  >
                    會員中心
                  </Link>
                </li>
                <li className="hover:text-neongreen">
                  <Link
                    onClick={() => setDropDownOpen(false)}
                    href={`/account/play-game/${auth.id}`}
                  >
                    玩遊戲
                  </Link>
                </li>
                <li className="hover:text-neongreen">
                  <Link
                    onClick={async (e) => {
                      e.preventDefault();
                      setDropDownOpen(false);
                      toast.success('已登出', { duration: 1500 });
                      logout();
                      router.push('/');
                    }}
                    href="/"
                  >
                    登出
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* bottom navbar for mobile */}
      <div className="z-50 h-20 bg-dark btm-nav btm-nav-sm md:hidden">
        {[
          {
            title: '配對交友',
            icon: <BsChatSquareHeart className="text-h5" />,
            href: '/date',
          },
          {
            title: '社群媒體',
            icon: <BsGlobe2 className="text-h5" />,
            href: '/community',
          },
          {
            title: '行程規劃',
            icon: <FiCalendar className="text-h5" />,
            href: '/trip',
          },
          {
            title: '酒吧探索',
            icon: <BiSolidDrink className="text-h5" />,
            href: '/bar',
          },
          {
            title: '電影探索',
            icon: <BsTicketPerforated className="text-h5" />,
            href: '/booking',
          },
        ].map((button, index) => (
          <button
            key={index}
            className={` cursor-auto ${
              currentPageTitle === button.title ? 'active text-primary' : ''
            }`}
          >
            <Link
              className={`text-xs ${
                currentPageTitle === button.title
                  ? 'text-primary'
                  : 'text-light'
              } sm:px-0.5 lg:px-8 flex flex-col items-center hover:text-primary hover:active:text-primary`}
              href={button.href}
            >
              {button.icon}
              <span className="text-[9px] ">{button.title}</span>
            </Link>
          </button>
        ))}
      </div>
    </>
  );
}
