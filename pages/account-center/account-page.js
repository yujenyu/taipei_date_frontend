import React, { Fragment, useState, useEffect } from "react";
import Sidebar from "@/components/account-center/sidebar/sidebar";
import Link from "next/link";
import { BsList } from "react-icons/bs";

export default function AccountIndex() {
    return (
        <>
            <div className="flex min-h-screen bg-dark ">
                <div class="z-40 sm:block">
                    <Sidebar />
                </div>
                <div class="w-screen px-4 sm:px-6 md:px-8 lg:ps-14 lg:pe-44 xl:pe-60 py-12">
                    <div className="flex flex-col w-full">
                    {/* 小漢堡START */}
                        <div className="flex align-middle border-b border-solid menu-title ps-0">
                            <div className="flex items-center drawer-content sm:hidden">
                                <label
                                    htmlFor="my-drawer-2"
                                    className="drawer-button lg:hidden"
                                >
                                    <BsList className="text-2xl" />
                                </label>
                            </div>
                            <div className="text-2xl text-light ms-3">
                                基本資料
                            </div>
                        </div>
                    {/* 小漢堡END */}
                    {/* CONTENT1 START */}
                        <div className="grid h-20 mt-6 card bg-base-300 rounded-box place-items-center">
                            content
                            <button
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_5")
                                        .showModal()
                                }
                            >
                                open modal
                            </button>
                            <dialog
                                id="my_modal_5"
                                className="modal modal-bottom sm:modal-middle"
                            >
                                <div className="modal-box">
                                    <h3 className="text-lg font-bold">
                                        Hello!
                                    </h3>
                                    <p className="py-4">
                                        Press ESC key or click the button below
                                        to close
                                    </p>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">
                                                Close
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    {/* CONTENT1 END */}
                        
                        <div className="divider"></div>
                    {/* CONTENT2 START */}
                        <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
                            content
                        </div>
                    {/* CONTENT2 END */}
                    </div>
                </div>
            </div>
        </>
    );
}
