import { HiOutlineLocationMarker } from 'react-icons/hi';
import BookingCancelModal from '../modal/booking-cancel-modal';

export default function BarBookingListCard() {

  return (
    <>
      <div className="gap-4 flex">
        <div className="bar-booking-card-image">
          <img
            className="h-[100px] w-[100px] lg:h-[120px] lg:w-[120px] object-cover rounded-xl"
            src="https://damei17.com/wp-content/uploads/2022/08/Fake-Sober-24.jpg"
            alt="profile pic"
          />
        </div>
        <div className="bar-booking-card-detail w-[328px] md:w-[600px] lg:w-[900px]">
          <div className="flex w-100 justify-between">
            <div className="text-[15px] lg:text-[16px] text-white">
              Fake Sober Taipei
            </div>
            <div>
              <div
                type="submit"
                className="badge badge-outline border-white text-[12px] text-white h-[24px] w-[76px] hover:bg-[#FF03FF] hover:text-black"
                onClick={() =>
                  document.getElementById('booking-cancel-modal').showModal()
                }
              >
                <span>刪除訂位</span>
                <BookingCancelModal />
              </div>
            </div>
          </div>
          <div className="booking-list-location flex gap-2">
            <HiOutlineLocationMarker />
            <div className="text-[11px] lg:text-[15px] text-white">
              台北市信義區松壽路20號
            </div>
          </div>
          <div className="bar-booking-detail flex gap-4">
            <div className="booking-list-title text-[12px] lg:text-[15px] text-white">
              <div className=" mb-1">預約人數</div>
              <div className=" mb-1">預約日期</div>
              <div className=" mb-1">預約時段</div>
            </div>
            <div className="booking-list-value text-[12px] lg:text-[15px] text-white">
              <div className=" mb-1">2人</div>
              <div className=" mb-1">2024-03-21</div>
              <div className=" mb-1">20:00</div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-100" />
    </>
  );
}
