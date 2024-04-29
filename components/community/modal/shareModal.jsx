// import { FaRegCircleXmark } from 'react-icons/fa6';
import { useRef } from 'react';
import Swal from 'sweetalert2';

export default function ShareModal({ post, postId, modalId }) {
  const shareModalRef = useRef(null);

  const shareUrl = post ? `http://localhost:3000/community/post/${postId}` : '';

  // console.log(shareUrl);

  // React 複製連結到剪貼板的函數
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        shareModalRef.current.close();
        Swal.fire({
          title: '複製連結成功!',
          icon: 'success',
          confirmButtonText: '關閉',
          confirmButtonColor: '#A0FF1F',
          background: 'rgba(0, 0, 0, 0.85)',
        });
      })
      .catch((err) => {
        shareModalRef.current.close();
        console.error('無法複製連結: ', err);
        Swal.fire({
          title: '複製連結失敗!',
          icon: 'error',
          confirmButtonText: '關閉',
          confirmButtonColor: '#A0FF1F',
          background: 'rgba(0, 0, 0, 0.85)',
        });
      });
  };

  return (
    <>
      <dialog
        id={modalId}
        ref={shareModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className="modal-box sm:w-auto md:w-[500px] h-[300px] "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p className="font-bold text-lg mb-5 text-h5 flex justify-center">
            分享
          </p>
          {/* <label className="input input-bordered flex items-center gap-2 mb-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" className="grow" placeholder="搜尋......" />
          </label> */}
          {/* <p className="text-h6 mb-3">歷史紀錄</p> */}
          {/* <ul>
            <li className="searchModalListItem flex flex-row justify-between items-center mb-3 p-2">
              <div className="card-iconListLeft flex flex-row">
                <div className="avatar mr-3">
                  <div className="w-10 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <span className="searchModalListItemText text-h6">UserID</span>
              </div>

              <div className="card-iconListRight flex justify-end">
                <FaRegCircleXmark className="text-h5" />
              </div>
            </li>
          </ul> */}
          <div className="mb-4">
            <input
              type="text"
              className="input input-bordered w-full my-5"
              readOnly
              value={shareUrl}
              onClick={copyToClipboard}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3"
              onClick={copyToClipboard} // 點擊按鈕以複製連結
            >
              複製連結
            </button>
          </div>
          {/* <div className="flex justify-center">
            <button className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3">
              <span>傳送</span>
            </button>
          </div> */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
