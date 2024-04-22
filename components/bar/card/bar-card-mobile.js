import { IoMdStarOutline, IoMdStar } from 'react-icons/io';

export default function BarCardMobile() {
  return (
    <>
      <div className="bar-card-mobile card rounded-none w-[159px] h-[238px]">
        <figure>
          <button>
            <img
              className="w-[159px] h-[151px] object-cover"
              src="https://damei17.com/wp-content/uploads/2022/08/Fake-Sober-24.jpg"
              alt=""
            />
          </button>
        </figure>
        <div className="bar-mobile-card-description h-[87px] m-1">
          <div className="text-[14px] text-white">Fake Sober Taipei</div>
          <button>
            <div className="flex w-[47px] border rounded-[30px] border-[#A0FF1F] mb-1">
              <div className="text-[10px] text-white m-0.5 ml-2">4.7</div>
              <div className="m-0.5 mr-2">
                <IoMdStar className="text-[13px] text-white" />
              </div>
            </div>
          </button>
          <div className="text-[12px] text-white">信義區</div>
          <div className="w-[150px] flex justify-between">
            <div className="text-[12px] text-white">特色酒吧</div>
            <button className="flex border rounded-[30px] border-white hover:bg-[#A0FF1F]">
              <div className="text-[10px] text-white m-0.5 mx-2 hover:text-[black]">
                立即訂位
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
