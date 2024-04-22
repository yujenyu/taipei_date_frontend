import React from 'react';

export default function SelectBtn({ onAcceptClick, onRejectClick }) {
  return (
    <div className="flex justify-center">
      <button
        className="text-black border-2 rounded-full btn-primary bg-primary border-primary hover:shadow-xl3 w-40 py-1 mx-2 md:w-60 md:py-2"
        onClick={onAcceptClick}
      >
        開啟友誼之門
      </button>
      <button
        className="bg-black border-2 rounded-full border-primary text-primary hover:shadow-xl3 w-40 py-1 mx-2 md:w-60 md:py-2 "
        onClick={onRejectClick}
      >
        探索其他可能
      </button>
    </div>
  );
}
