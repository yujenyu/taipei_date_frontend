import Link from 'next/link';

export default function ChangePWSuccessModal() {
  // const result = true;
  const result = false;
  return (
    <>
      <input
        type="checkbox"
        id="change_pw_success_modal"
        role="dialog"
        className="modal-toggle"
      />
      <div className=" modal modal-bottom sm:modal-middle">
        <div className="flex justify-center modal-box w-[98%] me-1 h-[365px] flex flex-col sm:w-[564px]">
          <p className={`flex justify-center font-bold text-slate-200 text-h4`}>
            更改結果
          </p>
          <p className={`flex justify-center mt-[25px] font-bold text-h5 `}>
            {result ? '更改密碼完成' : '資料有誤'}
          </p>
          <div className="justify-center modal-action mt-[30px]">
            <label
              htmlFor="change_pw_success_modal"
              className={`${
                result ? 'hidden' : ''
              } btn w-1/2 min-h-[30px] btn-sm sm:w-[135px] rounded-full border-dark  btn-primary btn bg-primary hover:bg-primary hover:shadow-xl3 hover:border-primary font-bold `}
            >
              繼續更改
            </label>
            <Link
              href="/account-center/account-index"
              className="btn w-1/2 min-h-[25px] h-[32px] btn-sm sm:w-[140px] rounded-full btn-outline bg-dark btn-md hover:bg-dark text-primary hover:text-primary hover:shadow-xl3 hover:border-dark "
            >
              返回會員中心
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
