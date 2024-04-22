export default function BarRatingEditModal() {
  return (
    <>
      <dialog
        id="bar-rating-edit-modal"
        className="modal modal-bottom sm:modal-middle text-white"
      >
        <div
          className="modal-box h-[365px] border border-white space-y-8 flex flex-col justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <div className="flex items-center justify-center">
            <img
              className="w-[99px] h-[99px] object-cover rounded-full"
              src="https://damei17.com/wp-content/uploads/2022/08/Fake-Sober-24.jpg"
              alt="bar pic"
            ></img>
          </div>
          <div className="col-span-10 flex justify-center items-center">
            <div>
              編輯您對 <span>Fake Sober Taipei</span> 的整體滿意度
            </div>
          </div>
          <div className="bar-detail-stars flex justify-center items-center gap-3 rating rating-md">
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
            />
          </div>
          <div className="flex justify-center">
            <button className="btn w-[320px] text-black text-[15px] border-[#A0FF1F] rounded-[20px]">
              <a href="/bar/bar-rating-list" className="text-white">
                確定更改
              </a>
            </button>
            <br />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"></form>
      </dialog>
    </>
  );
}
