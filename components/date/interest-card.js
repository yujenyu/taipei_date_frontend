import React, { useState, useEffect } from 'react';
import SelectBarModal from './modal/select-bar-modal';
import SelectMovieModal from './modal/select-movie-modal';
import PairingModal from './modal/pairing-modal';
import { useDate } from '@/context/date-context';

export default function InterestCard() {
  const { toggleBar, setToggleBar, toggleMovie, setToggleMovie } = useDate();

  useEffect(() => {
    if (toggleBar['id'] !== 0 && toggleMovie['id'] !== 0) {
      document.getElementById('pairing_modal').checked = true;
      return;
    }
  }, [toggleBar, toggleMovie]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        <div className="flex flex-col justify-center items-center p-4 border-3 border rounded-2xl mb-8 md:mb-0">
          <img
            className="w-48 h-48 mb-4 md:mb-8"
            src="/bar.jpg"
            alt="酒吧圖片"
          />
          <p className="text-sm pb-4 md:pb-8">{toggleBar['name']}</p>

          <SelectBarModal />
        </div>
        <div className="flex flex-col justify-center items-center p-4 border-3 border rounded-2xl">
          <img
            className="w-48 h-48 mb-4 md:mb-8"
            src="/movie.jpg"
            alt="電影院圖片"
          />
          <p className="text-sm pb-4 md:pb-8">{toggleMovie['name']}</p>
          <SelectMovieModal />
        </div>
      </div>
      <PairingModal />
    </>
  );
}
