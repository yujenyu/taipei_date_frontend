import Image from 'next/image';
import Head from 'next/head';
import DateCard from '@/components/index/date_card';
import ThemeCard from '@/components/index/theme_card';
import RegisterAcc from '@/components/index/register_acc';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        {/* <KeyView and Login  /> */}
        <RegisterAcc />
        {/* Data */}
        <div className="carousel carousel-center rounded-box max-w-full overflow-x-auto scrollbar-hide md:gap-[120px] p-[80px] ">
          <div className="carousel-item p-4">
            <DateCard
              title="Taipei Date浪漫啟程"
              paragraph="我們深知交友的重要性，提供了豐富的功能。無論您是喜歡電影、喝酒，還是喜歡規劃一天的行程，共同的興趣和活動可以成為一段關係的契機。"
              imageSrc="/date_index_1.jpg"
              altText="約會"
            />
          </div>
          <div className="carousel-item p-4">
            <DateCard
              title="真誠約會，樂趣相伴！"
              paragraph="Taipei Date不只是一個約會平台，更是一個建立真誠連結的地方。鼓勵開放、坦誠的交流，讓每一場約會都充滿歡笑和深刻的感動。"
              imageSrc="/date_index_2.jpg"
              altText="約會"
            />
          </div>
          <div className="carousel-item p-4">
            <DateCard
              title="突破框架，愉快約會"
              paragraph="以真誠交友和有趣出遊為核心的約會平台！致力於改變約會遊戲的規則，打破陳舊的框架開啟一段珍貴的關係。"
              imageSrc="/date_index_3.jpg"
              altText="約會"
            />
          </div>
        </div>

        <Link href="/date">
          <button className="w-40 py-1 my-2 text-black border-2 rounded-full md:w-80 h-[55px] md:py-2 btn-primary bg-primary border-primary hover:shadow-xl3">
            開始配對
          </button>
        </Link>

        {/* Other Theme */}

        <div className="carousel carousel-center rounded-box w-full overflow-x-auto scrollbar-hide object-center md:gap-[120px] p-[120px]">
          <div className="carousel-item px-4 ">
            <ThemeCard
              imagePic="/theme.jpg"
              paragraphText="我以為我了解網站，但我真的了解網站嗎？仔細想想，我對網站的理解只是皮毛而已。網站的出現，必將帶領人類走向更高的巔峰。"
              buttonText="我要看電影"
              link="/movie"
            />
          </div>
          <div className="carousel-item px-4">
            <ThemeCard
              imagePic="/bar-index.jpg"
              paragraphText="無論是想體驗運動酒吧的熱烈氛圍，享受音樂酒吧的現場演出，探索充滿特色的主題酒吧，還是沉浸在異國酒吧的獨特文化中，點擊探索都能滿足您的需求！"
              buttonText="立即探索!"
              link="/bar"
            />
          </div>
          <div className="carousel-item px-4">
            <ThemeCard
              imagePic="/trip_index.jpg"
              paragraphText="安排屬於自己的完美行程，和剛結識的新朋友共享難忘的一天!利用我們提供的行程規劃功能，讓每一次約會都成為一段最完美的回憶!"
              buttonText="開始規劃"
              link="/trip"
            />
          </div>
          <div className="carousel-item px-4">
            <ThemeCard
              imagePic="/theme.jpg"
              paragraphText="Taipei Date是一個以友誼為核心的交友社群平台，旨在幫助人們輕鬆拓展人際網。不論您是新遷至城市尋找同伴，探索新興趣，或僅想擴大社交圈，Taipei Date提供簡易匹配系統，讓您根據共同的興趣和生活方式找到理想的朋友。"
              buttonText="探索更多"
              link="/community"
            />
          </div>
        </div>
      </div>
    </>
  );
}
