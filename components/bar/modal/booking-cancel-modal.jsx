export default function BookingCancelModal() {
  return (
    <>
      <dialog
        id="booking-cancel-modal"
        className="modal modal-bottom sm:modal-middle text-white"
      >
        <div
          className="modal-box h-[500px] border border-white grid grid-cols-2"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <div className="col-span-1"></div>
          <div className="col-span-10 space-y-4 text-center">
            <div className="font-bold text-h5">確定要刪除訂位?</div>
            <div className="font-bold text-h6">以下是您的訂位資訊：</div>
            <div className="text-h6 space-y-4 h-[258px]  border border-white rounded-lg p-6">
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
              <button className="btn w-[320px] text-black text-[15px] border-[#FF03FF] rounded-[20px]">
                <a href="/bar/bar-booking-list" className="text-white">
                  刪除訂位
                </a>
              </button>
              <br />{' '}
              <button className="btn w-[320px] text-black text-[15px] border-[#A0FF1F] rounded-[20px]">
                <a href="/bar/bar-booking-list" className="text-white">
                  返回訂位紀錄
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
