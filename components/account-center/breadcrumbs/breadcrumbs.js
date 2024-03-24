import React from 'react'
import Link from "next/link";

export default function Breadcrumbs({currentPage}) {
  return (
    <>
                                  <ul>
                                <li>
                                    <Link href="/">首頁</Link>
                                </li>
                                <li>
                                    <Link href="/account-center/account-index">
                                        會員中心
                                    </Link>
                                </li>
                                <li>{currentPage}</li>
                            </ul>
    </>
  )
}
