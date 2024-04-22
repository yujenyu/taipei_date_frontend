import React from 'react';
import Link from 'next/link';

export default function PasswordForget({
  setPasswordForgetBtn,
  switchHandler,
}) {
  return (
    <>
      <div
        className={`flex flex-col w-full md:w-1/2 my-10 ease-in-out duration-1000 min-h-[399px]  `}
      >
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-4 lg:px-8">
          <div className="relative flex items-center justify-center">
            <a
              onClick={(e) => {
                e.preventDefault();
                setPasswordForgetBtn(false);
              }}
              className="absolute left-0 font-bold text-center cursor-pointer text-h3 text-dark"
            >
              ←
            </a>
            <p className="font-bold text-center text-h3 text-dark ">忘記密碼</p>
            <div> </div>
          </div>
          <form className="flex flex-col ">
            <div className="flex flex-col mt-20">
              <label className="flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300  mb-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 min-w-[14px] opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow text-slate-700"
                  placeholder="Email"
                />
              </label>
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="w-full px-4 py-2 mt-6 font-semibold text-center transition duration-200 ease-in bg-white border-2 rounded-full md:mx-auto text-dark border-slate-200 hover:bg-slate-200 hover:border-slate-400 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              發送
            </button>
          </form>

          <button
            onClick={switchHandler}
            className="w-1/2 px-4 py-2 mx-auto font-bold border-2 rounded-xl mt-14 text-primary btn-primary bg-dark border-dark hover:shadow-xl3 md:hidden"
          >
            會員註冊
          </button>
        </div>
      </div>
    </>
  );
}
