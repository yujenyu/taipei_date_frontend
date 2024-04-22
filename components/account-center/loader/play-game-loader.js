import React from 'react';
import styles from './loader.module.css';

export default function PGLoader() {
  return (
    <>
      <div className="container flex justify-center items-center w-[361.4px]  border-dark max-h-[53px] py-4">
        <div className="w-full text-center text-white basis-1/2 skeleton h-[30px]"></div>

        <div className="w-full text-center text-white basis-1/2 skeleton h-[30px]"></div>
      </div>
      {/* Body 遊戲區 */}
      <div className="container relative w-full min-h-[527px] ">
        <div className="w-full skeleton h-[332.1px] relative ">
          <div className="absolute z-50 top-[-250px] flex justify-center w-full md:basis-6/12">
            <div
              className="flex items-center justify-center w-full"
              style={{ minHeight: '100vh' }}
            >
              <div className={`${styles[`lds-heart`]}`}>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        {/*Footer-Left 控制遊戲速度 */}
        <div className="absolute bottom-[40px] left-[40px] flex ">
          <div className="relative flex flex-col ">
            <div className="skeleton w-[160px] h-[60px] absolute left-[-25px] bottom-[45px]  rounded-full  transform rotate-45"></div>
            <button
              className={`text-nowrap text-[12px] absolute bottom-[90px] left-0  rounded-full skeleton h-[40px] w-[40px]`}
            ></button>
            <button
              className={`text-nowrap text-[12px] absolute bottom-[55px] left-[35px]   rounded-full skeleton h-[40px] w-[40px] `}
            ></button>
            <button
              className={`text-nowrap text-[12px] absolute bottom-[20px] left-[70px]   rounded-full skeleton h-[40px] w-[40px] `}
            ></button>
          </div>
        </div>

        <div
          className={`absolute w-[50px] h-[50px]  right-[75px] bottom-[135px] skeleton`}
        ></div>
        <div
          className={`absolute w-[50px] h-[50px]  right-[20px]  bottom-[80px] skeleton`}
        ></div>
        <div
          className={`absolute w-[50px] h-[50px]  right-[130px]  bottom-[80px] skeleton`}
        ></div>
        <div
          className={`absolute w-[50px] h-[50px]  right-[75px]  bottom-[25px] skeleton`}
        ></div>
      </div>
    </>
  );
}
