import React from 'react';
import styles from './loader.module.css';

export default function Loader() {
  return (
    <>
      <div className="z-50 flex justify-center w-full md:basis-6/12">
        <div
          className="flex items-center justify-center w-full"
          style={{ minHeight: '100vh' }}
        >
          <div className={`${styles[`lds-heart`]}`}>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
