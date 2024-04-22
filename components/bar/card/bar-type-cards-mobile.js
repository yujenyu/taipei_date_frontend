import Link from "next/link";

export default function BarTypeCardsMobile() {
  return (
    <>
      <button className="m-4">
        <Link href="/bar/bar-list">
          <div className="mx-5">
            <div className=" relative items-center justify-center">
              <div className="w-[340px]">
                <img
                  className="object-cover w-[338px] h-[109px] rounded-[10px] opacity-50"
                  src="https://www.themagnificentmile.com/assets/Uploads/_resampled/CroppedFocusedImageWzE0MDAsNjAwLCJ5IiwxNjZd/Right-Field-Booth2.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-8 start-36">
                <p className="text-[15px] text-white">運動酒吧</p>
                <p className="text-[15px] text-white">sport bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
      <button className="m-4">
        <Link href="/bar/bar-list">
          <div className="mx-5">
            <div className=" relative items-center justify-center">
              <div className="w-[340px]">
                <img
                  className="object-cover w-[338px] h-[109px] rounded-[10px] opacity-50"
                  src="https://hongkongcheapo.com/wp-content/uploads/sites/7/2020/03/Hong-Kong-music-venue_Peel-Fresco_by-Peel-Fresco.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-8 start-36">
                <p className="text-[15px] text-white">音樂酒吧</p>
                <p className="text-[15px] text-white">music bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
      <button className="m-4">
        <Link href="/bar/bar-list">
          <div className="mx-5">
            <div className=" relative items-center justify-center">
              <div className="w-[340px]">
                <img
                  className="object-cover w-[338px] h-[109px] rounded-[10px] opacity-50"
                  src="https://images.squarespace-cdn.com/content/v1/5ffdc197eebe5c34a6cacb49/1611940806525-ARLGJC62G4CGG1VD0MHK/international+front.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-8 start-36">
                <p className="text-[15px] text-white">異國酒吧</p>
                <p className="text-[15px] text-white">sport bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
      <button className="m-4">
        <Link href="/bar/bar-list">
          <div className="mx-5">
            <div className=" relative items-center justify-center">
              <div className="w-[340px]">
                <img
                  className="object-cover w-[338px] h-[109px] rounded-[10px] opacity-50"
                  src="https://magarticles.magzter.com/articles/11977/390333/5deb8a0917c92/SpecialityBars-The-New-Trend.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-8 start-36">
                <p className="text-[15px] text-white">特色酒吧</p>
                <p className="text-[15px] text-white">specialty bar</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
      <button className="m-4">
        <Link href="/bar/bar-list">
          <div className="mx-5">
            <div className=" relative items-center justify-center">
              <div className="w-[340px]">
                <img
                  className="object-cover w-[338px] h-[109px] rounded-[10px] opacity-50"
                  src="https://bartendersbusiness.com/en/articles/images/w/1200/BartendersBusiness-01222019060923000000-5c46b393188eb.jpg"
                  width={253}
                />
              </div>
              <div className="absolute top-8 start-36">
                <p className="text-[15px] text-white">其他酒吧</p>
                <p className="text-[15px] text-white">others</p>
              </div>
            </div>
          </div>
        </Link>
      </button>
    </>
  );
}
