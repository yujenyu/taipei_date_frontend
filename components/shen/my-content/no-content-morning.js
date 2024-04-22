import { useState, useEffect } from 'react';
import { FaCirclePlus, FaTrash } from 'react-icons/fa6';

export default function NoContentMorning() {
  const [deleteContent, setDeleteContent] = useState(false);

  // 為彈跳視窗設定開啟和關閉函數（刪除不存在的行程）
  const openDeleteModal = () => setDeleteContent(true);
  const closeDeleteModal = () => setDeleteContent(false);

  return (
    <>
      <div className="flex justify-center items-end gap-9">
        <a href="#" className="hidden">
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
        <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl">
          <a href="/trip/trip-recomend">
            <FaCirclePlus className="text-2xl mb-1.5 hover:text-[#a0ff1f]" />
          </a>
          <h3>早上</h3>
        </div>
        <a href="#" className="pb-2" onClick={openDeleteModal}>
          <FaTrash className="text-2xl hover:text-[#a0ff1f]" />
        </a>
        {/* 以 useState 來控制<dialog> */}
        {deleteContent && (
          <dialog open className="modal">
            <form action="#" method="post">
              {/* 之後要跟後端路由連結 */}
              <div className="modal-box w-96 flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg mb-4 text-[#a0ff1f] ">
                  無法刪除不存在的行程 :P
                </h3>
                <div className="modal-action">
                  {/* 更新按鈕的onClick，以關閉彈出視窗 */}
                  <button
                    type="button"
                    className="btn text-white bg-black px-8 py-1 border border-white rounded-full hover:bg-[#a0ff1f] hover:text-black hover:border-black"
                    onClick={closeDeleteModal}
                  >
                    關閉
                  </button>
                </div>
              </div>
            </form>
          </dialog>
        )}
      </div>
    </>
  );
}
