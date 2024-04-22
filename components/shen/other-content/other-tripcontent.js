import React from 'react';

export default function OtherTripContent({ imageSrc, altText = 'Trip Image' }) {
  return (
    <div className="relative group">
      <img
        src={imageSrc}
        alt={altText}
        className="object-cover w-32 h-32 transition-transform duration-300 ease-in-out group-hover:scale-110  border border-white rounded-lg cursor-pointer"
      />
      {/* hover時顯示文字 */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer">
        <p className="text-white text-xl text-center">{altText}</p>
        {/* 文字到時候要是movie或bar的名字 */}
      </div>
    </div>
  );
}
