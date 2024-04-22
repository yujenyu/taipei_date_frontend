import React, { useState, useEffect } from 'react';
import WithContent from './with-content';

// 輔助函式：將Buffer轉換成base64
function bufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default function BarPhotoMy({ trip_plan_id }) {
  const [imageSrc1, setImageSrc1] = useState(''); //儲存第一支api取得的數據
  const [barDetails, setBarDetails] = useState({}); //儲存第二支api取得的數據

  useEffect(() => {
    const fetchBarImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/trip/my-details/bar-photo/${trip_plan_id}`
        );
        if (!response.ok) {
          throw new Error('fetch 酒吧圖片失敗');
        }
        const data = await response.json();
        console.log('Received JSON:', data);

        // 檢查所有獲得的 data ，至多3個，找到第一個包含 bar_img的項目
        const imageData = data.find(
          (item) => item.bar_img && item.bar_img.data
        );
        if (imageData && imageData.bar_img && imageData.bar_img.data) {
          const base64String = bufferToBase64(imageData.bar_img.data);
          console.log(
            'Generated Base64 Image URL:',
            `data:image/jpeg;base64,${base64String}`
          );
          setImageSrc1(`data:image/jpeg;base64,${base64String}`);
        } else {
          console.log('No bar_img found or data is incorrect');
        }
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
    };
    if (trip_plan_id) {
      fetchBarImage();
    }
  }, [trip_plan_id]); // 確保此 useEffect 依賴 trip_plan_id 來載入

  useEffect(() => {
    const fetchBarName = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/trip/my-details/bar-name/${trip_plan_id}`
        );
        if (!response.ok) {
          throw new Error('fetch 酒吧名稱失败');
        }
        const data = await response.json();
        console.log('Received JSON:', data);

        if (data && data.length > 0) {
          setBarDetails({
            name: data[0].bar_name,
          });
          console.log(barDetails);
        } else {
          console.log('No bar_name found');
        }
      } catch (error) {
        console.error('Error fetching the bar_name:', error);
      }
    };

    if (trip_plan_id) {
      fetchBarName();
    }
  }, [trip_plan_id]); // 確保此 useEffect 依賴 trip_plan_id 來載入

  return (
    <div>
      <WithContent imageSrc={imageSrc1} altText={barDetails.name} />
    </div>
  );
}
