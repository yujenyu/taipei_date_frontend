import React from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';

export default function MyTripContent2() {
  return (
    <>
      <div className="flex justify-center items-end gap-9">
        <a href="#" className="hidden">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
        <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl">
          <a href="#">
            <FaCirclePlus className="text-2xl mb-1.5 hover:text-[#a0ff1f]" />
          </a>
          <h3>早上</h3>
        </div>
        <a href="#" className="pb-2">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
      </div>
      <div className="flex justify-center items-end gap-9">
        <a href="#" className="hidden">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
        <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl">
          <a href="#">
            <FaCirclePlus className="text-2xl mb-1.5 hover:text-[#a0ff1f]" />
          </a>
          <h3>下午</h3>
        </div>
        <a href="#" className="pb-2">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
      </div>
      <div className="flex justify-center items-end gap-9">
        <a href="#" className="hidden">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
        <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl overflow-hidden">
          <img
            src="/image/S__277135365.jpg"
            alt="Trip Image"
            className="object-cover w-full h-full"
          />
        </div>
        <a href="#" className="pb-2">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
      </div>
    </>
  );
}
