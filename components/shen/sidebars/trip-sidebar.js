import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TripSidebar() {
  const router = useRouter();
  const isCalendar = router.pathname === '/trip';
  const isMyTrip = router.pathname === '/trip/my-trip';
  const isOtherTrip = router.pathname === '/trip/other-trip';

  return (
    <>
      <div className="pt-16 pb-3 border-b-2 border-white sm:ml-20 sm:mr-20 ">
        <div className="trip-sidebar">
          <p className="hidden mb-2 text-4xl sm:block">行程規劃</p>
          <div className="flex justify-around sidebarOptions sm:justify-start">
            <Link
              href="/trip"
              className={`text-xs sm:text-base mr-8 ${
                isCalendar ? 'text-[#a0ff1f]' : 'hover:text-[#a0ff1f]'
              }`}
            >
              我的日曆
            </Link>
            <Link
              href="/trip/my-trip"
              className={`text-xs sm:text-base mr-8 ${
                isMyTrip ? 'text-[#a0ff1f]' : 'hover:text-[#a0ff1f]'
              }`}
            >
              我的行程
            </Link>
            <Link
              href="/trip/other-trip"
              className={`text-xs sm:text-base mr-8 ${
                isOtherTrip ? 'text-[#a0ff1f]' : 'hover:text-[#a0ff1f]'
              }`}
            >
              其他人的分享
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
