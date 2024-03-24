/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "@/components/account-center/sidebar/sidebar";
import Link from "next/link";
import {BsEmojiHeartEyes } from "react-icons/bs";
import PageTitle from "@/components/page-title";
import Breadcrumbs from "@/components/account-center/breadcrumbs/breadcrumbs";
import BurgerMenu from "@/components/account-center/burgermenu/burger-menu";

export default function AccountIndex() {
    const [pageTitle, setPageTitle] = useState("會員中心");
    const [currentPage, setCurrentPage] = useState("個人資料");
    const missionFinish = true;
    // const missionFinish = false
    return (
        <>
            <PageTitle pageTitle={pageTitle} />
            <div className="flex min-h-screen bg-dark ">
                <div class="z-40 sm:block">
                    <Sidebar />
                </div>
                <div class="w-screen px-4 sm:px-6 md:px-8 lg:ps-14 lg:pe-44 xl:pe-60 py-12">
                    <div className="flex flex-col w-full ">
                        <div className="flex align-middle border-b border-solid menu-title ps-0">
                            {/* 小漢堡START */}
                            <BurgerMenu />
                            {/* 小漢堡END */}
                            <div className="text-2xl text-light ms-3">
                                {currentPage}
                            </div>
                        </div>

                        <div className="text-sm breadcrumbs ms-2">
                            <Breadcrumbs currentPage={currentPage} />
                        </div>

                        {/* CONTENT1 START */}
                        <div className="flex flex-col h-full lg:mx-1 xl:mx-1 2xl:mx-12 lg:flex-row card bg-base-300 rounded-box place-items-center">
                            <div className="justify-center avatar basis-1/2">
                                <div className="w-48 mx-4 my-4 rounded-full">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className="container basis-1/2">
                                <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
                                    <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                                        電子郵件：
                                    </p>
                                    <span className="basis-1/2 lg:basis-2/3">
                                        XXX@gamil.com
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center mx-4 mb-7">
                                    <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                                        暱稱：
                                    </p>
                                    <span className="basis-1/2 lg:basis-2/3">
                                        小明
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                                    <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                                        性別：
                                    </p>
                                    <span className="basis-1/2 lg:basis-2/3">
                                        男
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                                    <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                                        手機號碼：
                                    </p>
                                    <span className="basis-1/2 lg:basis-2/3">
                                        0912345678
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                                    <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                                        生日：
                                    </p>
                                    <span className="basis-1/2 lg:basis-2/3">
                                        2000-01-01
                                    </span>
                                </div>
                                <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                                    <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                                        積分：
                                    </p>
                                    <span className="basis-1/2 lg:basis-2/3">
                                        320
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* CONTENT1 END */}

                        <div className="divider"></div>

                        {/* CONTENT2 START */}
                        <div className="flex flex-col justify-start h-full lg:mx-1 xl:mx-1 2xl:mx-12 bg-base-300 rounded-box ">
                            <div className="mt-4 text-xl ms-2 text-light menu-title">
                                每日獎勵：
                            </div>
                            <div className="flex flex-col mx-20 mb-8 2xl:mx-40 md:flex-row">
                                <div className="flex flex-col items-center justify-center mb-4 md:mb-0 basis-1/2">
                                    <div
                                        className={`flex justify-center mx-4 my-4 rounded-full bg-neutral-700 place-items-center ring ring-primary h-36 w-36  ${
                                            missionFinish ? "shadow-xl4" : " "
                                        }`}
                                    >
                                        <p
                                            className={`text-xl ${
                                                missionFinish
                                                    ? "hidden"
                                                    : "block"
                                            }`}
                                        >
                                            10 積分
                                        </p>
                                        <BsEmojiHeartEyes
                                            className={`text-9xl text-secondary ${
                                                missionFinish
                                                    ? "block"
                                                    : "hidden"
                                            }`}
                                        />
                                    </div>
                                    <div
                                        className={`text-xl text-center ${
                                            missionFinish ? "text-light" : ""
                                        }`}
                                    >
                                        每日登入
                                        <span
                                            className={`text-sm ms-2 ${
                                                missionFinish
                                                    ? "hidden"
                                                    : "inline-block"
                                            }`}
                                        >
                                            未完成
                                        </span>
                                        <span
                                            className={`text-sm text-light ms-2 ${
                                                missionFinish
                                                    ? "inline-block"
                                                    : "hidden"
                                            }`}
                                        >
                                            完成
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center mb-4 md:mb-0 basis-1/2">
                                    <div className="flex justify-center mx-4 my-4 rounded-full bg-neutral-700 place-items-center ring ring-primary h-36 w-36">
                                        <p className="text-xl">10 積分</p>
                                    </div>
                                    <div className="text-xl text-center">
                                        遊玩遊戲
                                        <span className="text-sm ms-2">
                                            未完成
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* CONTENT2 END */}

                        <div className="divider"></div>

                        {/* CONTENT3 START */}
                        <div className="flex flex-col justify-start h-full mb-20 lg:mx-1 xl:mx-1 2xl:mx-12 bg-base-300 rounded-box">
                            <div className="mt-4 text-xl ms-2 text-light menu-title">
                                關於我：
                            </div>
                            <div className="flex justify-center mx-4 mt-4 mb-8 md:mx-12 2xl:mx-16 md:flex-row">
                                <textarea
                                    placeholder=""
                                    readOnly
                                    className="w-full h-48 max-w-4xl textarea textarea-bordered textarea-lg text-slate-900"
                                >
                                    你好，我是小明，平常我喜歡去酒吧放鬆，有空也喜歡去看電影，很高興認識妳！
                                </textarea>
                            </div>
                        </div>
                        {/* CONTENT3 END */}
                    </div>
                </div>
            </div>
        </>
    );
}
