import React, { useState, useEffect } from 'react';
import TripPhoto from '../other-content/bar-photo-other';

export default function MovieCarousel() {
  const photoCount = 10; // 假設有10張照片
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false); // 新增狀態來追蹤滑鼠懸停狀態

  useEffect(() => {
    // 當isHovering為true時停止輪播
    if (!isHovering) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photoCount);
      }, 5000); // 每5秒切換一次內容，注釋有誤

      return () => clearInterval(interval);
    }
  }, [isHovering, photoCount]); // 依賴列表中添加isHovering

  return (
    <div
      className="carousel-container gap-5 hidden sm:flex sm:flex-col mt-1 mb-8"
      onMouseEnter={() => setIsHovering(true)} // 滑鼠進入時暫停輪播
      onMouseLeave={() => setIsHovering(false)} // 滑鼠離開時恢復輪播
    >
      <h3 className="text-center">熱門電影</h3>
      {[...Array(3)].map((_, i) => {
        // 直接在這裡計算顯示內容的索引
        let index = (currentIndex + i) % photoCount;
        return <TripPhoto key={index} />;
      })}
    </div>
  );
}
