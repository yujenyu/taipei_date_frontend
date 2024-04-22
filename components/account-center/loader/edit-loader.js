import React from 'react';
import styles from './loader.module.css';

export default function EditLoader() {
  return (
    <>
      <div className="relative flex flex-col h-full skeleton lg:mx-1 xl:mx-1 2xl:mx-12 lg:flex-row card bg-base-300 rounded-box place-items-center">
        <div className="absolute z-50 flex justify-center w-full md:basis-6/12">
          <div
            className="flex items-center justify-center w-full"
            style={{ minHeight: '50vh' }}
          >
            <div className={`${styles[`lds-heart`]}`}>
              <div></div>
            </div>
          </div>
        </div>
        <div className="justify-center avatar basis-1/2">
          <div className="w-48 mx-4 my-4 rounded-full skeleton"></div>
        </div>
        <div className="container basis-1/2">
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
          <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
            <p className="w-full h-[24px] text-center skeleton ms-2 lg:ms-0 "></p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex flex-col justify-start h-[300px] mb-20 skeleton lg:mx-1 xl:mx-1 2xl:mx-12 bg-base-300 rounded-box"></div>
    </>
  );
}
