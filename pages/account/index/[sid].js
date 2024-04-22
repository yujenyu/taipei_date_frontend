/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Sidebar from '@/components/account-center/sidebar/sidebar';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import PageTitle from '@/components/page-title';
import Breadcrumbs from '@/components/account-center/breadcrumbs/breadcrumbs';
import BurgerMenu from '@/components/account-center/burgermenu/burger-menu';
import { ACCOUNT_GET, API_SERVER } from '@/components/config/api-path';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { useLoader } from '@/context/use-loader';
import toast from 'react-hot-toast';
import IndexLoader from '@/components/account-center/loader/index-loader';
import Link from 'next/link';

export default function AccountIndex({ onPageChange }) {
  const pageTitle = '會員中心';
  const currentPage = '個人資料';
  const router = useRouter();
  const { userAvatar, setUserAvatar, getAuthHeader, checkAuth } = useAuth();
  const { close, isLoading } = useLoader();

  const [userInf, setUserInf] = useState({
    email: '',
    name: '',
    gender: '',
    mobile: '',
    birthday: '',
    fav1: '',
    fav2: '',
    point: 0,
    profile: '',
    hasLogin: true,
    hasPlay: false,
  });

  const getUserInf = async () => {
    // console.log(router.query.sid);
    // const
    try {
      const res = await fetch(`${ACCOUNT_GET}/${router.query.sid}`, {
        headers: { ...getAuthHeader() },
      });
      const result = await res.json();

      // console.log('result', result);
      if (result.success) {
        const {
          user_id,
          email,
          username,
          avatar,
          gender,
          mobile,
          birthday,
          bar_type_name,
          movie_type,
          total_points,
          profile_content,
        } = result.data;

        setUserInf({
          ...userInf,
          email: email,
          name: username,
          gender: gender,
          mobile: mobile,
          birthday: birthday,
          fav1: bar_type_name,
          fav2: movie_type,
          point: total_points,
          profile: profile_content,
          hasLogin: result.hasLogin,
          hasPlay: result.hasPlay,
        });

        setUserAvatar(avatar);
        close(1.5);
      } else {
        toast.error(result.error, {
          duration: 1500,
        });
        router.push('/');
        return;
      }
    } catch (ex) {
      toast.error(ex, {
        duration: 1500,
      });
      console.log({ ex });
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    onPageChange(pageTitle);

    //進頁面做授權確認，router的query有改會調用fetchCheck
    const fetchCheck = async () => {
      const result = await checkAuth(router.query.sid);
      if (!result.success) {
        toast.error(result.error, { duration: 1500 });
        router.push('/');
        return;
      }
      getUserInf();
      close(1.5);
    };
    fetchCheck();

    //進頁面做授權確認，授權通過，接收user的資料
  }, [router.query]);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <div className="flex min-h-screen pt-10 bg-dark">
        <div className="z-40 sm:block">
          <Sidebar currentPage={currentPage} />
        </div>
        <div className="w-screen px-4 py-12 sm:px-6 md:px-8 lg:ps-14 lg:pe-44 xl:pe-60">
          <div className="flex flex-col w-full ">
            <div className="flex align-middle border-b border-solid menu-title ps-0">
              {/* 小漢堡START */}
              <BurgerMenu />
              {/* 小漢堡END */}
              <div className="text-2xl text-light ms-3">{currentPage}</div>
            </div>

            <div className="text-sm breadcrumbs ms-2">
              <Breadcrumbs currentPage={currentPage} />
            </div>

            {isLoading ? (
              <IndexLoader />
            ) : (
              <>
                <div className="flex flex-col h-full lg:mx-1 xl:mx-1 2xl:mx-12 lg:flex-row card bg-base-300 rounded-box place-items-center">
                  <div className="justify-center avatar basis-1/2">
                    <div className="w-48 mx-4 my-4 rounded-full">
                      <img
                        src={
                          userAvatar
                            ? userAvatar
                            : `${API_SERVER}/avatar/defaultAvatar.jpg`
                        }
                        alt="會員大頭照"
                      />
                    </div>
                  </div>
                  <div className="container basis-1/2">
                    <div className="flex flex-row justify-center mx-4 lg:justify-start my-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        電子郵件：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.email}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        暱稱：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.name}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        手機號碼：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.mobile}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        性別：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.gender}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        生日：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.birthday}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        酒吧喜好：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.fav1}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        電影喜好：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.fav2}
                      </span>
                    </div>
                    <div className="flex flex-row justify-center mx-4 lg:justify-start mb-7">
                      <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                        目前積分：
                      </p>
                      <span className="basis-1/2 lg:basis-2/3">
                        {userInf.point}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="flex flex-col justify-start h-full lg:mx-1 xl:mx-1 2xl:mx-12 bg-base-100 rounded-box ">
                  <div className="mt-4 text-xl ms-2 text-light menu-title">
                    每日積分：
                  </div>
                  <div className="flex flex-col mx-20 mb-8 2xl:mx-40 md:flex-row">
                    <div className="flex flex-col items-center justify-center mb-4 md:mb-0 basis-1/2">
                      <div
                        className={`flex justify-center mx-4 my-4 rounded-full bg-neutral-700 place-items-center ring ring-primary h-36 w-36  ${
                          userInf.hasLogin ? 'shadow-xl4' : ' '
                        }`}
                      >
                        <p
                          className={`text-xl ${
                            userInf.hasLogin ? 'hidden' : 'block'
                          }`}
                        >
                          10 積分
                        </p>
                        <BsEmojiHeartEyes
                          className={`text-9xl text-secondary animate-pulse ${
                            userInf.hasLogin ? 'block' : 'hidden'
                          }`}
                        />
                      </div>
                      <div
                        className={`text-xl text-center ${
                          userInf.hasLogin ? 'text-light' : ''
                        }`}
                      >
                        每日登入
                        <span
                          className={`text-sm ms-2 ${
                            userInf.hasLogin ? 'hidden' : 'inline-block'
                          }`}
                        >
                          未完成
                        </span>
                        <span
                          className={`text-sm text-light ms-2 ${
                            userInf.hasLogin ? 'inline-block' : 'hidden'
                          }`}
                        >
                          完成
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mb-4 md:mb-0 basis-1/2">
                      <div
                        className={`flex justify-center mx-4 my-4 rounded-full bg-neutral-700 place-items-center ring ring-primary h-36 w-36  ${
                          userInf.hasPlay ? 'shadow-xl4' : ' '
                        }`}
                      >
                        <p
                          className={`text-xl ${
                            userInf.hasPlay ? 'hidden' : 'block'
                          }`}
                        >
                          10 積分
                        </p>
                        <BsEmojiHeartEyes
                          className={`text-9xl text-secondary animate-pulse ${
                            userInf.hasPlay ? 'block' : 'hidden'
                          }`}
                        />
                      </div>
                      <div
                        className={`text-xl text-center ${
                          userInf.hasPlay ? 'text-light' : ''
                        }`}
                      >
                        遊玩遊戲
                        <span
                          className={`text-sm ms-2 ${
                            userInf.hasPlay ? 'hidden' : 'inline-block'
                          }`}
                        >
                          未完成
                        </span>
                        <span
                          className={`text-sm text-light ms-2 ${
                            userInf.hasPlay ? 'inline-block' : 'hidden'
                          }`}
                        >
                          完成
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="flex flex-col justify-start h-full mb-20 lg:mx-1 xl:mx-1 2xl:mx-12 bg-base-100 rounded-box">
                  <div className="mt-4 text-xl ms-2 text-light menu-title">
                    關於我：
                  </div>
                  <div className="flex justify-center mx-4 mt-4 mb-8 2xl:mx-16 md:flex-row">
                    <textarea
                      value={userInf.profile || '輸入些甚麼...'}
                      readOnly
                      className="w-full h-48 max-w-4xl textarea textarea-bordered textarea-lg text-slate-400"
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
