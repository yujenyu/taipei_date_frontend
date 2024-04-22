import React from 'react';
import Link from 'next/link';

function TabBar({ tabs }) {
  return (
    <>
      <div
        role="tablist"
        className="w-full tabs tabs-bordered fixed top-16 bg-dark"
      >
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.path} // 使用 href 屬性指定導頁的路徑
            role="tab"
            className={`tab ${tab.active ? 'tab-active' : ''}`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </>
  );
}

export default TabBar;
