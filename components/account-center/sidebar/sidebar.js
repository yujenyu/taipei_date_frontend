import React from "react";
import Link from "next/link";
import {
    BsFillPersonFill,
    BsCreditCard2FrontFill,
    BsFillKeyFill,
    BsDpadFill,
    BsCashCoin,
    BsCollection,
} from "react-icons/bs";

export default function Sidebar() {
    return (
        <>
            <div className="*//drawer sm:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="w-64 min-h-full bg-dark py-28 pe-4 ps-4 sm:w-36 lg:w-80 sm:py-12 sm:ps-18 sm:pe-0 md:ps-12 md:w-44 lg:ps-44 xl:w-96 xl:ps-60 menu bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li className="mt-3 border-b border-solid sm:mt-0 menu-title">
                            <p className="text-2xl text-light">會員中心</p>
                        </li>
                        <li className="hover:text-neongreen">
                            <Link className="text-base" href="/account-center/account-index">
                                <BsFillPersonFill />
                                個人資料
                            </Link>
                        </li>
                        <li className="hover:text-neongreen">
                            <Link className="text-base" href="/account-center/account-edit">
                                <BsCreditCard2FrontFill />
                                資料編輯
                            </Link>
                        </li>
                        <li className="hover:text-neongreen">
                            <Link className="text-base" href="/">
                                <BsFillKeyFill />
                                更改密碼
                            </Link>
                        </li>
                        <li className="hover:text-neongreen">
                            <Link className="text-base" href="/">
                                <BsDpadFill />
                                遊玩遊戲
                            </Link>
                        </li>
                        <li className="hover:text-neongreen">
                            <Link className="text-base" href="/">
                                <BsCashCoin />
                                積分查詢
                            </Link>
                        </li>
                        <li className="hover:text-neongreen">
                            <Link className="text-base" href="/">
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
