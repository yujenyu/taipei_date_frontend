import React from 'react';
import Link from 'next/link';

export default function BarTypeCards(bar , key) {
  return (
    <>
      {/* others https://bartendersbusiness.com/en/articles/images/w/1200/BartendersBusiness-01222019060923000000-5c46b393188eb.jpg */}
      {/* specialty  https://magarticles.magzter.com/articles/11977/390333/5deb8a0917c92/SpecialityBars-The-New-Trend.jpg*/}
      {/* foreign bar https://images.squarespace-cdn.com/content/v1/5ffdc197eebe5c34a6cacb49/1611940806525-ARLGJC62G4CGG1VD0MHK/international+front.jpg */}
      {/* music bar https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pastelbangkok.com%2Fbest-live-music-bars-bangkok%2F&psig=AOvVaw37pC88oXIUzFqTHec-hn5X&ust=1713420371174000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiTyLzKyIUDFQAAAAAdAAAAABAE */}
      <button className="">
        <Link href={`/bar/bar-list/`}>
          <div
            className="py-4 ml-5 mr-5"
            // shadow="sm"
            // isPressable
            // onPress={() => console.log('item pressed')}
          >
            <div className="relative py-2">
              <div className="w-[254px] hover:text-black">
              <div className="w-[254px] hover:text-black">
                <img
                  className="object-cover w-[254px] h-[248px] rounded-[10px] opacity-50 hover:opacity-100"
                  src="https://www.themagnificentmile.com/assets/Uploads/_resampled/CroppedFocusedImageWzE0MDAsNjAwLCJ5IiwxNjZd/Right-Field-Booth2.jpg"
                  className="object-cover w-[254px] h-[248px] rounded-[10px] opacity-50 hover:opacity-100"
                  src="https://www.themagnificentmile.com/assets/Uploads/_resampled/CroppedFocusedImageWzE0MDAsNjAwLCJ5IiwxNjZd/Right-Field-Booth2.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-20 left-20 items-center justify-center">
                <p className="text-[20px] text-white m-2">運動酒吧</p>
                <p className="text-[20px] text-white m-2">sport bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
      <button className="">
        <Link href="/bar/bar-list">
          <div
            className="py-4 ml-5 mr-5"
            // shadow="sm"
            // isPressable
            // onPress={() => console.log('item pressed')}
          >
            <div className="relative py-2">
              <div className="w-[254px]">
                <img
                  className="object-cover w-[254px] h-[248px] rounded-[10px] opacity-50 hover:opacity-100"
                  src="https://hongkongcheapo.com/wp-content/uploads/sites/7/2020/03/Hong-Kong-music-venue_Peel-Fresco_by-Peel-Fresco.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-20 left-20 items-center justify-center">
                <p className="text-[20px] text-white m-2">音樂酒吧</p>
                <p className="text-[20px] text-white m-2">music bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
      <button className="">
        <Link href="/bar/bar-list">
          <div
            className="py-4 ml-5 mr-5"
            // shadow="sm"
            // isPressable
            // onPress={() => console.log('item pressed')}
          >
            <div className="relative py-2">
              <div className="w-[254px]">
                <img
                  className="object-cover w-[254px] h-[248px] rounded-[10px] opacity-50 hover:opacity-100"
                  src="https://images.squarespace-cdn.com/content/v1/5ffdc197eebe5c34a6cacb49/1611940806525-ARLGJC62G4CGG1VD0MHK/international+front.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-20 left-20 items-center justify-center">
                <p className="text-[20px] text-white m-2">異國酒吧</p>
                <p className="text-[20px] text-white m-2">foreign bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
    </>
  );
}
