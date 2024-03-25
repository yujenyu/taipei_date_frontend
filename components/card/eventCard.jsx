import { FiSend } from 'react-icons/fi';

const mockData = {
  time: '2024 年 5 月 18 日 9:00 下午',
  title: '復古派對',
  location: '台北, 台灣',
};

export default function EventCard(index) {
  return (
    <>
      <div
        key={index}
        className="px-2 mb-4 w-full sm:w-full md:w-1/2 lg:w-1/3 flex items-center justify-center"
      >
        <div className="card w-[300px] h-[480px] glass mb-10 mt-10 flex items-center justify-center">
          <figure className="card-photo m-0">
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="car!"
              className="card-photo w-[300px] h-[300px] object-cover"
            />
          </figure>
          <div className="card-body h-auto w-full p-0 overflow-auto flex flex-col justify-between">
            <div className="card-info text-h4 flex flex-col justify-between">
              <div className="flex flex-row justify-between">
                <div className="card-infoLeft flex flex-row mt-3 ml-1">
                  <div className="flex flex-col">
                    <p className="text-h6">{mockData.time}</p>
                    <p className="text-h6">{mockData.title}</p>
                    <p className="text-h6">{mockData.location}</p>
                  </div>
                </div>
                <div className="card-iconListRight flex justify-end mt-3 mr-1">
                  <FiSend className="card-icon hover:text-neongreen" />
                </div>
              </div>
            </div>
            <div className="card-actions flex justify-center mt-3 mb-3">
              <button className="btn bg-neongreen hover:bg-neongreen text-light">
                參加
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
