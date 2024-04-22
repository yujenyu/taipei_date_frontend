import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoMdStarOutline, IoMdStar } from 'react-icons/io';
import { BsTelephone } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FaRegHeart } from 'react-icons/fa';
import BarRatingModal from '@/components/bar/modal/bar-rating-modal';

export default function BarDetailCard({bar}) {
  const [bars, setBars] = useState([]);

  const getBarList = async () => {
    try {
      const res = await fetch('http://localhost:3001/bar/bar-list');
      const data = await res.json();
      // console.log(data);
      setBars(data);
    } catch (error) {
      console.log('Failed to fetch bar list:', error);
    }
  };

  useEffect(() => {
    getBarList();
    // console.log('useEffect log -> bars:', bars);
  }, []);

  return (
    <>
      <div className="md:space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bar-detail-content text-white space-y-5">
            <div className="space-y-1 md:w-full">
              <div className="text-h6 md:text-h3">
                {/* Fake Sober Taipei */}
                {bars.bar_name}
              </div>
              <div className="review flex gap-2 items-center">
                <p className="text-[20px]">4.6</p>
                <div className="bar-detail-stars flex gap-1 rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-[#A0FF1F]"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-[#A0FF1F]"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-[#A0FF1F]"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-[#A0FF1F]"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-[#A0FF1F]"
                    checked
                  />
                </div>
                <p className="text-[13px] md:text-h6">
                  {'('}21 則評論{')'}
                </p>
              </div>
              <div className="flex gap-4 text-[13px] md:text-h6">
                <div className="text-white">
                  大安區
                  {/* {bar.bar_area_name} */}
                </div>
                <div className="text-white">
                  特色酒吧
                  {/* {bar.bar_type_name} */}
                </div>
              </div>
              <div className="flex telephone gap-4">
                <BsTelephone />
                <div className="text-white text-[13px] md:text-h6">
                  0227220723
                </div>
              </div>
              <div className="flex address gap-4">
                <HiOutlineLocationMarker />
                <div className="text-white text-[13px] md:text-h6">
                  台北市信義區松壽路20號
                </div>
              </div>
              <div className="text-white text-[13px] md:text-h6 text-justify md:w-full">
                Fake Sober 位在信義威秀後方，
                許多人說他有美國又或是韓國感的咖啡館，半開放式的空間到了夜晚還有
                DJ 表演，甚至供應雞尾酒、啤酒與披薩，不趕時間的話可以很 Chill
                的在這裡從白天待到晚間時刻，雖然那日是下午到訪，不過我們也舒服待上幾小時呢！
              </div>
            </div>
            <div className="bar-detail-button-group flex items-center gap-4">
              <button>
                <div className="badge badge-outline border-[#A0FF1F] text-white h-[28px]">
                  <FaRegHeart className="mr-1" />
                  加入收藏
                </div>
              </button>
              <button>
                <div className="badge badge-outline border-[#A0FF1F] text-white h-[28px]">
                  加入行程
                </div>
              </button>
              <div
                type="submit"
                onClick={() =>
                  document.getElementById('bar-rating-modal').showModal()
                }
              >
                <div className="badge badge-outline border-[#A0FF1F] text-white h-[28px]">
                  留下評論
                </div>
                <BarRatingModal />
              </div>
            </div>
            <button className="btn w-[320px] text-black text-[15px] bg-[#A0FF1F] border-none rounded-[20px]">
              <a href="/bar/bar-booking">立即訂位</a>
            </button>
          </div>
          <div className="bar-detail-img">
            <img
              className="object-cover rounded-[10px] w-[328px] h-[300px] md:w-[440px] md:h-[400px]"
              src="https://damei17.com/wp-content/uploads/2022/08/Fake-Sober-24.jpg"
            />
          </div>
        </div>
        <div className="google-map hidden md:flex">
          <Image
            src="/images/googleMap.png"
            width={1062}
            height={741}
            alt="map"
            className="rounded-[20px]"
          />
        </div>
      </div>
    </>
  );
}
