import React from 'react';

export default function Recbar() {
  return (
    <>
      <div className="recbar mt-8 mr-10 flex-row-reverse right-6 hidden lg:flex lg:w-48">
        <div className="recbarWrapper">
          <div className="recbarListTitle flex mb-5 p-2 ml-3">推薦用戶</div>

          <ul className="recbarList grid">
            <li className="recbarListItem flex items-center mb-3 p-2">
              <div className="avatar mr-3 ml-3">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <span className="recbarListItemText text-h6">UserID</span>
            </li>

            <li className="recbarListItem flex items-center mb-3 p-2">
              <div className="avatar mr-3 ml-3">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <span className="recbarListItemText text-h6">UserID</span>
            </li>

            <li className="recbarListItem flex items-center mb-3 p-2">
              <div className="avatar mr-3 ml-3">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <span className="recbarListItemText text-h6">UserID</span>
            </li>

            <li className="recbarListItem flex items-center mb-3 p-2">
              <div className="avatar mr-3 ml-3">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <span className="recbarListItemText text-h6">UserID</span>
            </li>

            <li className="recbarListItem flex items-center mb-3 p-2">
              <div className="avatar mr-3 ml-3">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <span className="recbarListItemText text-h6">UserID</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
