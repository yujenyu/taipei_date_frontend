import { useEffect, useState } from 'react';
import TabBar from '@/components/bar/bar/tab-bar';
import Breadcrumbs from '@/components/bar/breadcrumbs/breadcrumbs';
import BarDetailCard from '@/components/bar/card/bar-detail-card';

export default function BarDetail({ bar }) {
  const initialTabs = [
    { title: '酒吧地圖', path: '/bar/bar-map', active: false },
    { title: '酒吧首頁', path: '/bar', active: true },
    { title: '訂位紀錄', path: '/bar/bar-booking-list', active: false },
  ];
  const currentPage = 'Fake Sober';

  return (
    <>
      <div className="fixed top-16 bg-dark w-full h-8 justify-center mx-auto">
        {/* <TabBar tabs={initialTabs} /> */}
      </div>

      <div className="flex flex-row pt-28 justify-center">
        {/* 留 2/12 空白 */}
        <div className="w-1/12 md:w-2/12"></div>
        <div className="w-10/12 md:w-8/12">
          <div className="text-sm breadcrumbs">
            <Breadcrumbs currentPage={currentPage} />
          </div>
          <BarDetailCard bar={bar} />
        </div>
        <div className="w-1/12 md:w-2/12"></div>
      </div>
    </>
  );
}
