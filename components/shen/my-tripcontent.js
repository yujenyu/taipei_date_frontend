import React from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import Link from 'next/link';

export default function MyTripContent() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl">
        <Link href="/trip/trip-recomend" legacyBehavior>
          <a className="text-2xl mb-1.5 hover:text-[#a0ff1f]">
            <FaCirclePlus />
          </a>
        </Link>

        <h3>早上</h3>
      </div>
      <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl">
        <Link href="/trip/trip-recomend" legacyBehavior>
          <a className="text-2xl mb-1.5 hover:text-[#a0ff1f]">
            <FaCirclePlus />
          </a>
        </Link>

        <h3>下午</h3>
      </div>
      <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl">
        <Link href="/trip/trip-recomend" legacyBehavior>
          <a className="text-2xl mb-1.5 hover:text-[#a0ff1f]">
            <FaCirclePlus />
          </a>
        </Link>
        <h3>晚上</h3>
      </div>
    </>
  );
}
