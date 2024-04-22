import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function WithContent({ imageSrc, altText }) {
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
        <div className="flex flex-col justify-center items-center w-32 h-32 border border-white rounded-2xl overflow-hidden relative group">
          <img
            src={imageSrc}
            alt={altText}
            onError={(e) => console.error('圖片載入失敗：', e)}
            className="object-cover w-32 h-32 transition-transform duration-300 ease-in-out group-hover:scale-110  border border-white rounded-lg cursor-pointer"
          />
          {/* hover時顯示文字 */}
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer">
            <p className="text-white text-xl text-center">{altText}</p>
            {/* 文字到時候要是movie或bar的名字 */}
          </div>
        </div>
        <a href="#" className="pb-2">
          <FaTrash
            className="text-2xl hover:text-[#a0ff1f]"
            onClick={openDeleteModal}
          />
        </a>
        {/* 以 useState 來控制<dialog> */}
        {deleteContent && (
          <dialog open className="modal">
            <form action="#" method="post">
              {/* 之後要跟後端路由連結 */}
              <div className="modal-box w-96 flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg mb-4 text-[#a0ff1f] ">
                  確定要刪除當幸福來敲門嗎？
                </h3>
                <h3 className="font-bold text-base mb-4 text-white ">
                  行程時段：晚上
                </h3>
                <div className="modal-action">
                  {/* 更新按鈕的onClick，以關閉彈出視窗 */}
                  <button
                    type="button"
                    className="btn text-base bg-black px-8  border border-white rounded-full hover:bg-[#a0ff1f] hover:text-black hover:border-black"
                    onClick={closeDeleteModal}
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="btn text-base bg-black px-8  border border-white rounded-full hover:bg-[#a0ff1f] hover:text-black hover:border-black"
                  >
                    確定
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
