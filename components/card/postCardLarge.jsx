import { FiHeart, FiSend, FiMessageCircle, FiBookmark } from 'react-icons/fi';

export default function PostCardLarge() {
  return (
    <>
      <div className="card w-[440px] h-[635px] glass mb-10 mt-10">
        <div className="card-user h-[80px] flex items-center">
          <div className="avatar mr-3 ml-3">
            <div className="w-12 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <span>USERID</span>
        </div>
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
            className="card-photo w-[440px] h-[440px] object-cover"
          />
        </figure>
        <div className="card-body h-[115px]">
          <div className="card-iconList text-h4 flex flex-row justify-between">
            <div className="card-iconListLeft flex flex-row">
              <FiHeart className="card-icon mr-3 hover:text-neongreen" />
              <FiMessageCircle className="card-icon mr-3 hover:text-neongreen" />
              <FiSend className="card-icon mr-3 hover:text-neongreen" />
            </div>
            <div className="card-iconListRight flex justify-end">
              <FiBookmark className="card-icon mr-3 hover:text-neongreen" />
            </div>
          </div>
          {/* <h2 className="card-title">Life hack</h2> */}
          <p>Here is the post context</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
}
