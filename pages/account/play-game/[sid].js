import { useState, useEffect } from 'react';
import Sidebar from '@/components/account-center/sidebar/sidebar';
import PageTitle from '@/components/page-title';
import Breadcrumbs from '@/components/account-center/breadcrumbs/breadcrumbs';
import BurgerMenu from '@/components/account-center/burgermenu/burger-menu';
import GameComponent from '@/components/account-center/game-component/game-component';
import { useLoader } from '@/context/use-loader';
import PGLoader from '@/components/account-center/loader/play-game-loader';
import { useAuth } from '@/context/auth-context';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function AccountPlayGame({ onPageChange }) {
  const { close, isLoading } = useLoader();
  const { checkAuth } = useAuth();
  const router = useRouter();

  const pageTitle = '會員中心';
  const currentPage = '遊玩遊戲';

  useEffect(() => {
    if (!router.isReady) return;
    //進頁面做授權確認，router的query有改會調用fetchCheck
    const fetchCheck = async () => {
      const result = await checkAuth(router.query.sid);
      if (!result.success) {
        toast.error(result.error, { duration: 1500 });
        router.push('/');
        return;
      }
      close(1.5);
    };
    fetchCheck();
  }, [router.query]);

  useEffect(() => {
    onPageChange(pageTitle);
    close(1.5);
  }, []);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <div className="flex min-h-screen pt-10 bg-dark ">
        <div className="z-40 sm:block">
          <Sidebar currentPage={currentPage} />
        </div>
        <div className="w-screen px-4 py-12 sm:px-6 md:px-8 lg:ps-14 lg:pe-44 xl:pe-60">
          <div className="flex flex-col w-full ">
            {/* 小漢堡START */}
            <div className="flex border-b border-solid item-center menu-title ps-0">
              <BurgerMenu />
              <div className="flex flex-row items-end">
                <div className="text-2xl text-light ms-3 min-w-[100px]">
                  {currentPage}
                </div>
              </div>
            </div>
            {/* 小漢堡END */}

            <div className="text-sm breadcrumbs ms-2">
              <Breadcrumbs currentPage={currentPage} />
            </div>

            {/* CONTENT1 START */}
            <div className="flex mx-auto">
              <div className="flex flex-col min-w-[363px] w-full border min-h-[580px] bg-base-300  border-slate-700 rounded-box">
                {isLoading ? <PGLoader /> : <GameComponent />}
              </div>
            </div>
            {/* CONTENT1 END */}
          </div>
        </div>
      </div>
    </>
  );
}
