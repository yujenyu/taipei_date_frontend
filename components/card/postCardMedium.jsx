import { FiHeart, FiSend, FiMessageCircle, FiBookmark } from 'react-icons/fi';

export default function PostCardMedium(index) {
  return (
    <>
      <div key={index} className="px-2 mb-4 w-full sm:w-full md:w-1/2 lg:w-1/3">
        <div className="card max-w-[270px] h-[380px] glass my-10 m-2 overflow-hidden">
          <figure className="card-photo m-0">
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="car!"
              className="card-photo w-[270px] h-[270px] object-cover"
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
            <p className="ml-1">
              Here is the post context, Here is the post context
            </p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </>
  );
}
