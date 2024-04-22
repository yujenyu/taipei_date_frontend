import React from 'react';

export default function BlockModal({ blockingClick }) {
  return (
    <>
      <dialog id="block_modal" className="modal">
        <div className="modal-box flex flex-col items-center">
          <h3 className="font-bold text-lg text-neongreen ">封鎖</h3>
          <p className="py-4">你確定要封鎖對方嗎？</p>
          <div className="modal-action items-center justify-center">
            {/* TODO: 補上onSubmit={handleFormSubmit}，或加上處理事件 */}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-black border-2 border-primary rounded-full text-primary min-h-[35px] h-[35px] w-[120px] mr-4">
                取消
              </button>
              <button
                className="btn border-2 btn-primary bg-primary border-primary rounded-full text-black min-h-[35px] h-[35px] w-[120px]"
                onClick={blockingClick}
              >
                確認
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
