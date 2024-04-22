import Link from 'next/link';

export default function EditSuccessModal({ modalState, sid, msg }) {
  // // const result = true;
  // const result = false;
  return (
    <>
      {/* <input
        type="checkbox"
        id="edit_success_modal"
        role="dialog"
        className="modal-toggle"
      /> */}
      <dialog
        id="edit_success_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="flex justify-center modal-box w-[98%] me-1 h-[365px] flex-col sm:w-[564px]">
          <p className={`flex justify-center text-h4`}>編輯結果</p>
          <p className={`flex justify-center font-bold mt-[30px] text-h3`}>
            {msg}
          </p>
          <div className="justify-center items-center modal-action mt-[30px] flex-col sm:flex-row">
            {/* <label
                htmlFor="edit_success_modal"
                className={`btn w-1/2 min-h-[30px] btn-sm sm:w-[135px] rounded-full border-dark  btn-primary btn bg-primary hover:bg-primary hover:shadow-xl3 hover:border-primary font-bold `}
              >
                繼續編輯
              </label> */}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className={`btn w-full  min-h-[30px] btn-sm sm:w-[135px] rounded-full border-dark  btn-primary bg-primary hover:bg-primary hover:shadow-xl3 hover:border-primary font-bold `}
              >
                繼續編輯
              </button>
              <Link
                href={`/account/index/${sid}`}
                className="btn w-full min-h-[25px] h-[32px] mt-4 btn-sm sm:w-[135px] sm:ml-4 rounded-full btn-outline bg-dark  hover:bg-dark text-primary hover:text-primary hover:shadow-xl3 hover:border-dark "
              >
                返回會員中心
              </Link>
            </form>
          </div>

          {/* <form method="dialog" className="modal-backdrop">
        </form> */}
        </div>
      </dialog>
    </>
  );
}
