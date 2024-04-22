import React from 'react';
import Link from 'next/link';

export default function ThemeCard({
  imagePic,
  paragraphText,
  buttonText,
  link,
}) {
  return (
    <>
      <div className="card card-compact  m-2 border border-1 flex  h-[100vw] w-[80vw] sm:h-[400px] sm:w-[600px] mx-auto items-center justify-center ">
        <figure className="w-[79vw] h-[70vw] sm:h-[900px] sm:w-[590px]">
          <img
            src={imagePic}
            alt="主題"
            className="object-cover object-center w-full h-full"
          />
        </figure>
        <div className="card-body h-auto w-full p-0 flex items-center max-w-[500px]">
          <p className="text-center">{paragraphText}</p>
          <div className="card-actions justify-center">
            <Link href={link}>
              <button className="w-40 py-1 my-2 md:w-60 md:py-2 bg-black border-2 border-primary rounded-full hover:shadow-xl3 ">
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
