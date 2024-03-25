import Image from 'next/image';
import Head from 'next/head';
import DateCard from '@/components/index/date_card';
import ThemeCard from '@/components/index/theme_card';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* <Account /> */}
        <div className="flex flex-col items-center">
          <button className="w-40 py-1 my-2 md:w-60 md:py-2 btn-primary bg-primary border-2 border-primary rounded-full text-black">
            建立帳號
          </button>
          <button className="w-40 py-1 my-2 md:w-60 md:py-2 bg-black border-2 border-primary rounded-full text-primary">
            登入會員
          </button>
        </div>
        {/* Data */}

        <div className="carousel rounded-box mb-20 flex justify-center items-center">
          <div className="carousel-item mr-8 max-w-screen-md">
            <DateCard />
          </div>
          <div className="carousel-item mr-8 max-w-screen-md">
            <DateCard />
          </div>
          <div className="carousel-item max-w-screen-md">
            <DateCard />
          </div>
        </div>
        <button className="w-40 py-1 mb-20 md:w-60 md:py-2 btn-primary bg-primary border-2 border-primary rounded-full text-black">
          開始配對
        </button>

        {/* Other Theme */}
        <ThemeCard />
      </div>
    </>
  );
}
