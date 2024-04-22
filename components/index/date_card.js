import React from 'react';

export default function DateCard({ title, paragraph, imageSrc, altText }) {
  return (
    <>
      <div className="card card-side items-center justify-center border  border-primary h-[70vw] sm:h-[400px] w-[80vw] sm:w-[700px] mx-auto pr-[5px]">
        <div className="items-center justify-center gap-8 card-body">
          <h2 className="mt-4 text-sm text-center card-title md:text-base lg:text-2xl ">
            {title}
          </h2>
          <p className="justify-center max-w-xs text-xs text-center sm:text-base md:text-xs xl:text-lg">
            {paragraph}
          </p>
        </div>
        <figure className="mx-auto max-w-[230px] max-h-[350px]">
          <img src={imageSrc} alt={altText} className="w-full h-auto" />
        </figure>
      </div>
    </>
  );
}
