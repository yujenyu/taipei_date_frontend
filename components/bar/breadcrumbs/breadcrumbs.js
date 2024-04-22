import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ currentPage, barType }) {
  return (
    <>
      <ul>
        <li>
          <Link href="/">首頁</Link>
        </li>
        <li>
          <Link href="/bar">酒吧探索</Link>
        </li>
        {/* 添加 bar-list  */}
        <li>
          <Link href="/bar/bar-list">酒吧列表</Link>
        </li>
        {/* 如果 barType 存在，顯示指定類型的連結 */}
        {barType && (
          <li>
            <Link href={`/bar/bar-list?type=${barType.id}`}>
              {barType.name}
            </Link>
          </li>
        )}
        <li>{currentPage}</li>
      </ul>
    </>
  );
}
