import React from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import Link from 'next/link';
import TripCalendarModal from './trip-calendar-modal';

export default function TripCard({ trip }) {
  // 使用動態生成路徑
  const detailPagePath = `/trip/other-trip/detail/${trip.trip_plan_id}`;

  return (
    <>
      <div className="relative bg-white rounded-lg p-2 flex flex-col items-center justify-center w-40 h-60">
        {/* 更新 Link 的 href 屬性為動態路徑 */}
        <Link href={detailPagePath}>
          <FaCircleInfo className="absolute right-0 top-0 text-4xl text-black hover:text-[#a0ff1f]" />
        </Link>

        <img
          className="w-36 h-36 object-cover rounded-lg mb-2"
          src="/image/S__277135365.jpg"
          alt="Card Image"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="text-black text-lg mb-2">{trip.trip_title}</p>
          <a
            href="#"
            className=" border-white border bg-black text-white font-medium py-1 px-2 rounded-full text-sm hover:bg-[#a0ff1f] hover:border-black hover:border hover:text-black"
            onClick={() => document.getElementById('my_modal_4').showModal()}
          >
            加入我的日曆
          </a>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl ">
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
              <TripCalendarModal />
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}
