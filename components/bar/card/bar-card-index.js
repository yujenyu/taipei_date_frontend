import { IoMdStarOutline, IoMdStar } from 'react-icons/io';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function BarCardIndex() {
  return (
    <div className="py-4">
      <div className="py-2">
        <div className="bar-card-index-img cursor-pointer">
          <img
            alt="Card background"
            className="relative object-cover w-[159px] h-[155px] md:w-[241px] md:h-[230px] rounded-[10px]"
            src="https://damei17.com/wp-content/uploads/2022/08/Fake-Sober-24.jpg"
          />
          <div className="absolute text-white top-1 right-1 text-[20px]">
            <FaRegHeart />
          </div>
        </div>
      </div>
      <div className="pb-0 pt-2 flex-col items-start text-white">
        <p className="text-[14px] md:text-[20px] font-bold mb-0.5">
          Fake Sober Taipei
        </p>
        <button>
          <div className="flex w-[55px] border rounded-[30px] border-[#A0FF1F] mb-1">
            <div className="text-[12px] m-0.5 ml-2">4.7</div>
            <div className="m-0.5 mr-2">
              <IoMdStar />
            </div>
          </div>
        </button>
        <p className="text-[15px] mb-0.5">信義區</p>
        <div className="w-[159px] md:w-[241px] flex justify-between">
          <p className="text-[15px] mb-0.5">特色酒吧</p>
          <div className="flex relative mb-1 border rounded-[30px] border-white hover:bg-[#A0FF1F]">
            <button>
              <div className="text-[12px] m-0.5 ml-2 mr-2 hover:text-[black]">
                立即訂位
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
