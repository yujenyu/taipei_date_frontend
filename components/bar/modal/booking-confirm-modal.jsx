export default function BookingConfirmModal() {
  return (
    <>
      <dialog
        id="booking-confirm-modal"
        className="modal modal-bottom sm:modal-middle text-white"
      >
        <div
          className="modal-box h-[500px] grid grid-cols-2 border border-white"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <div className="col-span-10 space-y-4 justify-center items-center">
            <div className="font-bold text-h5">您已訂位成功</div>
            <div className="font-bold text-h6">以下是您的訂位資訊：</div>
            <div className="text-h6 space-y-4 h-[238px]  border border-white rounded-lg flex flex-col justify-between p-6">
              <div className="">Fake Sober Taipei</div>
              <div className="telephone">0227220723</div>
              <div className="address">台北市信義區松壽路20號</div>
              <hr />
              <div className="text-h6 items-center space-y-4">
                <div className="grid grid-cols-2">
                  <div className="col-span-1">預約人數</div>
                  <div className="col-span-1">2人</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-1">預約日期</div>
                  <div className="col-span-1">2024/03/08 (五)</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-1">預約時段</div>
                  <div className="col-span-1">20:00</div>
                </div>
              </div>
            </div>
            <div className="col-span-1 space-y-4">
              <button className="btn w-[320px] text-black text-[15px] border-[#A0FF1F] rounded-[20px]">
                <a href="/bar/bar-booking-list" className="text-white">
                  查看訂位紀錄
                </a>
              </button>
              <br />
              <button className="btn w-[320px] text-black text-[15px] border-[#FF03FF] rounded-[20px]">
                <a href="/bar/bar-booking" className="text-white">
                  取消訂位
                </a>
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"></form>
      </dialog>
    </>
  );
}
