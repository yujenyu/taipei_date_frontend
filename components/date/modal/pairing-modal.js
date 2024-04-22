import { useDate } from '@/context/date-context';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PairingModal() {
  const { toggleBar, setToggleBar } = useDate();
  const { toggleMovie, setToggleMovie } = useDate();

  // const handleClearToggle = (event, bar) => {
  //   setToggleBar({
  //     id: 0,
  //     name: '請選擇一種喜愛的酒吧類型',
  //   });
  //   setToggleMovie({
  //     id: 0,
  //     name: '請選擇一種喜愛的電影類型',
  //   });
  // };

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="pairing_modal" className="btn hidden">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="pairing_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-lg text-neongreen ">配對中...</h3>
          <p className="py-4">
            我喜歡去{toggleBar['name']}與看{toggleMovie['name']}類型的電影！
          </p>
          <div className="modal-action items-center justify-center gap-3">
            <label
              htmlFor="pairing_modal"
              className=" flex items-center justify-center py-1 my-2 bg-black border-2 rounded-full border-primary text-primary hover:shadow-xl3 min-h-[35px] h-[35px] w-[120px] cursor-pointer"
            >
              重新選擇
            </label>
            <label className="flex items-center justify-center text-black border-2 rounded-full btn-primary bg-primary border-primary hover:shadow-xl3 min-h-[35px] h-[35px] w-[120px] cursor-pointer">
              <Link href="/date/new-friends">確認</Link>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
