import React, { useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import Link from 'next/link';

export default function TripCardMy({ trip, onDeleteSuccess }) {
  // 使用動態生成路徑
  const detailPagePath = `/trip/my-trip/detail/${trip.trip_plan_id}`;
  const [errorMessage, setErrorMessage] = useState('');

  // 確認刪除操作
  const onConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/trip/trip-plans/delete/${trip.trip_plan_id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (data.success) {
        onDeleteSuccess(trip.trip_plan_id);
      } else {
        setErrorMessage('刪除失敗。');
      }
    } catch (error) {
      console.error('刪除行程時發生錯誤:', error);
      setErrorMessage('刪除行程時發生錯誤。');
    }
    // 關閉對話框
    document.getElementById(`delete-dialog-${trip.trip_plan_id}`).close();
  };

  return (
    <>
      <div className="relative bg-white rounded-lg p-2 flex flex-col items-center justify-center w-40 h-60">
        <RxCrossCircled
          className="absolute right-0 top-0 text-4xl text-black hover:text-[#a0ff1f]"
          onClick={() =>
            document
              .getElementById(`delete-dialog-${trip.trip_plan_id}`)
              .showModal()
          }
        />
        <dialog id={`delete-dialog-${trip.trip_plan_id}`} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-[#a0ff1f] text-center">
              確定要刪除{trip.trip_title}整天的行程嗎？
            </h3>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div className="modal-action justify-center">
              <button
                className="btn"
                onClick={() =>
                  document
                    .getElementById(`delete-dialog-${trip.trip_plan_id}`)
                    .close()
                }
              >
                取消
              </button>
              <button className="btn ml-4" onClick={onConfirmDelete}>
                確定
              </button>
            </div>
          </div>
        </dialog>
        <img
          className="w-36 h-36 object-cover rounded-lg mb-2"
          src="/image/S__277135365.jpg"
          alt="Card Image"
        />
        <p className="text-black text-lg mb-2">{trip.trip_title}</p>
        <Link
          href={detailPagePath}
          className="bg-black hover:bg-[#a0ff1f] text-white hover:text-black border hover:border-black font-medium py-1 px-2 rounded-full text-sm"
        >
          檢視行程
        </Link>
      </div>
    </>
  );
}
