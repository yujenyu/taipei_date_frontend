import { FiHeart, FiSend, FiMessageCircle, FiBookmark } from 'react-icons/fi';

export default function PostCardMedium() {
  return (
    <>
      <div className="card w-[270px] h-[380px] glass mb-10 mt-10">
        <figure className="card-photo mt-5">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
            className="card-photo w-[250px] h-[250px] object-cover"
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
