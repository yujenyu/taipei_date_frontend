import React from "react";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RxBell } from "react-icons/rx";
import { Logo } from "@/components/account-center/header/Logo.jsx";

export default function Header() {
    const login = true;
    // const login = false;
    return (
        <>
            <div className="sticky top-0 z-50 navbar bg-dark">
                <div className="navbar-start">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <div className="hidden navbar-center md:flex">
                    <ul className="px-0 menu menu-horizontal">
                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li> */}
                        <li>
                            <Link
                                className="text-base sm:text-sm text-light hover:shadow-xl3 hover:text-neongreen sm:px-1 md:px-4 lg:px-8"
                                href="#"
                            >
                                配對交友
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-base text-light hover:shadow-xl3 hover:text-neongreen sm:text-sm sm:px-1 md:px-4 lg:px-8"
                                href="#"
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
                    <button className=" btn-ghost btn-circle btn hover:shadow-xl3">
                        <Link
                            className="flex justify-center text-2xl text-black align-middle"
                            href="#"
                        >
                            <RxBell />
                        </Link>
                    </button>
                    <button className="btn btn-ghost btn-circle hover:shadow-xl3">
                        <div className="indicator">
                            <Link className="text-2xl text-black" href="#">
                                <FaBookmark />
                            </Link>
                        </div>
                    </button>

                    <div
                        className={`dropdown dropdown-end ${
                            login ? "hidden " : " block"
                        }`}
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
                        className={`dropdown dropdown-end ${
                            login ? " block" : " hidden"
                        }`}
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
            <div className="z-50 h-20 bg-dark btm-nav btm-nav-sm md:hidden">
                <button className="active ">
                    <Link
                        className="text-xs text-light sm:px-0.5 lg:px-8 "
                        href="#"
                    >
                        配對交友
                    </Link>
                </button>
                <button className="hover:active ">
                    <Link
                        className="text-xs text-light sm:px-0.5 lg:px-8"
                        href="#"
                    >
                        社群媒體
                    </Link>
                </button>
                <button className="hover:active ">
                    <Link
                        className="text-xs text-light sm:px-0.5 lg:px-8"
                        href="#"
                    >
                        行程規劃
                    </Link>
                </button>
                <button className="hover:active ">
                    <Link
                        className="text-xs text-light sm:px-0.5 lg:px-8"
                        href="#"
                    >
                        酒吧探索
                    </Link>
                </button>
                <button className="hover:active ">
                    <Link
                        className="text-xs text-light sm:px-0.5 lg:px-8"
                        href="#"
                    >
                        電影探索
                    </Link>
                </button>
            </div>
        </>
    );
}
