import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

export default function SearchModal() {
  return (
    <>
      <dialog
        id="search_modal_mobile"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-[500px] h-[500px]">
          <p className="font-bold text-lg mb-5 text-h5 ">搜尋</p>
          <label className="input input-bordered flex items-center gap-2 mb-3 ">
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
          </label>
          <p className="text-h6 mb-3">歷史紀錄</p>
          <ul>
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
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
