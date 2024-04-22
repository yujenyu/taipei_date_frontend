import { IoMdStarOutline, IoMdStar } from 'react-icons/io';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import Link from 'next/link';

export default function BarCard({ bar, area, key }) {
  const currentPage = 'Fake Sober';
  console.log(bar);
  return (
    <>
      <div
        key={key}
        className=" card bg-white w-[159px] h-[228px] lg:w-[223px] lg:h-[320px] shadow-xl"
      >
        <figure>
          <div className="bar-card-img cursor-pointer">
            <Link href={`/bar/bar-detail/${bar.bar_id}`}>
              <img
                className="relative w-[159px] h-[146px] lg:w-[223px] lg:h-[205px] object-cover"
                src="https://damei17.com/wp-content/uploads/2022/08/Fake-Sober-24.jpg"
                alt="bar image"
              />
            </Link>
            <div className="absolute text-white top-3 right-3 text-[20px]">
              <FiHeart className="card-icon hover:text-neongreen" />
            </div>
          </div>
        </figure>
        <div className="bar-card-content h-[82px] lg:h-[115px] m-2">
          <div className="text-[13px] lg:text-[15px] text-black font-bold">
            {/* Fake Sober Taipei */}
            {bar.bar_name}
          </div>
          <button>
            <a href="/bar/bar-rating-list">
              <div className="flex w-[45px] lg:w-[50px] rounded-[30px] bg-[#BCBCBC]">
                <div className="text-[10px] lg:text-[12px] text-white m-0.5 ml-2">
                  {/* bar_rating -> bar_rating_star */}
                  4.7
                </div>
                <div className="m-0.5 mr-2">
                  <IoMdStar className="text-[14px] lg:text-[16px] text-white" />
                </div>
              </div>
            </a>
          </button>
          <p className="text-[11px] lg:text-[15px] text-black">
            {/* 信義區 */}
            {bar.bar_area_name}
          </p>
          <div className="w-[145px] lg:w-[200px] flex justify-between">
            <div className="text-[11px] lg:text-[15px] text-black">
              {/* bar_type -> bar_type_name*/}
              {/* 特色酒吧 */}
              {bar.bar_type_name}
            </div>
            <button className="flex relative rounded-[30px] bg-black hover:bg-[#A0FF1F]">
              <a
                className="text-[11px] lg:text-[12px] text-white hover:text-black m-0.5 mx-3"
                href="/bar/bar-booking"
              >
                立即訂位
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
