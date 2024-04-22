import Link from 'next/link';

export default function AddMovie() {
  return (
    <div className="flex justify-start items-center ">
      <div className="flex justify-start items-center ">
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-md object-cover"
          src="/image/S__277135365.jpg"
        />
        <div
          className="flex flex-col justify-center items-start ml-5 mr-5 sm:ml-12
     sm:mr-12"
        >
          <h2 className="text-white text-base sm:text-xl mb-5">
            哥吉拉x金剛：新帝國
          </h2>
          <div className="flex justify-start items-start ">
            <div className="text-white text-sm sm:text-base ">動作片</div>
          </div>
        </div>
      </div>
      <Link href="#" legacyBehavior>
        <a className="text-black  text-xs sm:text-lg px-4 sm:px-7 py-1 bg-[#a0ff1f]  rounded-full border border-black  flex justify-center items-center ">
          加入行程
        </a>
      </Link>
    </div>
  );
}
