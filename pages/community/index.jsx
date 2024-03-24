import React, { Fragment, useState, useEffect } from 'react';
import Feed from '@/components/feed/feed';
import Recbar from '@/components/recbar/recbar';
import Sidebar from '@/components/sidebar/sidebar';
import SidebarMobile from '@/components/sidebar/sidebarMobile';

export default function Index({ onPageChange }) {
  const pageTitle = '社群媒體';
  useEffect(() => {
    onPageChange(pageTitle);
  }, []);
  return (
    <>
      {/* sidebar for mobile */}
      <div className="md-hidden">
        <SidebarMobile />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="basis-3/12">
            <Sidebar />
          </div>
          <div className="basis-6/12">
            <Feed />
          </div>
          <div className="flex justify-end basis-3/12">
            <Recbar />
          </div>
        </div>
      </div>
    </>
  );
}
