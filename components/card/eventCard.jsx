import { FiSend } from 'react-icons/fi';

export default function EventCard() {
  return (
    <>
      <div className="card w-[270px] h-[480px] glass mb-10 mt-10">
        <figure className="card-photo mt-5">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
            className="card-photo w-[250px] h-[250px] object-cover"
          />
        </figure>
        <div className="card-body h-[115px]">
          <div className="card-info text-h4 flex flex-column justify-between">
            <div className="flex flex-row">
              <div className="card-infoLeft flex flex-row">
                <div className="flex flex-col">
                  <p className="text-h6">2024 年 5 月 18 日 9:00 下午</p>
                  <p className="text-h6">復古派對</p>
                  <p className="text-h6">台北, 台灣</p>
                </div>
              </div>
              <div className="card-iconRight flex justify-end">
                <FiSend className="card-icon mr-3 hover:text-neongreen" />
              </div>
            </div>
          </div>
          <div className="card-actions flex justify-center mt-4">
            <button className="btn bg-neongreen hover:bg-neongreen text-light">
              參加
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
