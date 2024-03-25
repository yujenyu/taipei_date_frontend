import { FiHeart, FiSend, FiMessageCircle, FiBookmark } from 'react-icons/fi';

export default function PostCardLarge() {
  return (
    <>
      <div className="card max-w-[440px] h-[635px] glass my-10 m-2 overflow-hidden flex">
        <div className="card-user h-14 flex items-center ">
          <div className="avatar mr-3 ml-1">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <span>USERID</span>
        </div>
        <figure className="m-0">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
            className="card-photo w-[440px] h-[440px] object-cover"
          />
        </figure>
        <div className="card-body h-auto w-full p-0 overflow-auto max-w-[440px]">
          <div className="card-iconList text-h4 flex flex-row justify-between">
            <div className="card-iconListLeft flex flex-row mt-3 ml-1">
              <FiHeart className="card-icon mr-3 hover:text-neongreen" />
              <FiMessageCircle className="card-icon mr-3 hover:text-neongreen" />
              <FiSend className="card-icon mr-3 hover:text-neongreen" />
            </div>
            <div className="card-iconListRight flex justify-end mt-3 mr-1">
              <FiBookmark className="card-icon hover:text-neongreen" />
            </div>
          </div>
          {/* <h2 className="card-title">Life hack</h2> */}
          <p className="mt-3 ml-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequatur corrupti aspernatur quas
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}
