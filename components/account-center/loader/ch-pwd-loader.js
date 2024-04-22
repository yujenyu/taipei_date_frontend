import React from 'react';
import styles from './loader.module.css';

export default function CPLoader() {
  return (
    <>
      <div className="flex flex-col h-full skeleton lg:mx-1 xl:mx-1 2xl:mx-12 lg:flex-row card bg-base-300 rounded-box place-items-center">
        <div className="container relative">
          <div className="absolute top-0 z-50 flex justify-center w-full md:basis-6/12">
            <div
              className="flex items-center justify-center w-full"
              style={{ minHeight: '40vh' }}
            >
              <div className={`${styles[`lds-heart`]}`}>
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mx-4 me-4 sm:me-16 lg:justify-start mt-7 ">
            <p className="text-center ms-2  lg:ms-0 h-[32px] skeleton w-full"></p>
          </div>
          <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mt-7 me-4 sm:me-16">
            <p className="w-full text-center ms-2 skeleton h-[32px] lg:ms-0 "></p>
          </div>
          <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mt-7 me-4 sm:me-16">
            <p className="w-full text-center ms-2 skeleton h-[32px] lg:ms-0 "></p>
          </div>
          <div className="flex justify-end mt-[30px] mx-4 mb-8 sm:mx-14 md:mx-16 lg:mx-14 xl:mx-16 2xl:mx-16">
            <div className="flex flex-col justify-center sm:flex-row sm:justify-end basis-full sm:basis-2/3">
              <div className="skeleton min-h-[40px] h-[40px] mt-4 sm:w-[140px] rounded-full "></div>
              <div className="skeleton min-h-[40px] h-[40px] mt-4 sm:w-[140px] sm:ml-4 rounded-full  "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
