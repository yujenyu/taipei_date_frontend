import React from 'react';

export default function SuggestionBar() {
  return (
    <>
      <div className="recbarWrapper">
        <div className="recbarListTitle flex mb-5 p-2">推薦用戶</div>

        <ul className="recbarList grid ">
          <li className="recbarListItem flex mb-3 p-2 gap-3 items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span className="recbarListItemText text-h6">UserID</span>
          </li>

          <li className="recbarListItem flex mb-3 p-2 gap-3 items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span className="recbarListItemText text-h6">UserID</span>
          </li>

          <li className="recbarListItem flex mb-3 p-2 gap-3 items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span className="recbarListItemText text-h6">UserID</span>
          </li>

          <li className="recbarListItem flex mb-3 p-2 gap-3 items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span className="recbarListItemText text-h6">UserID</span>
          </li>

          <li className="recbarListItem flex mb-3 p-2 gap-3 items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span className="recbarListItemText text-h6">UserID</span>
          </li>
        </ul>
      </div>
    </>
  );
}
