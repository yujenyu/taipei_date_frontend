import React from 'react';
import LeftLogin from '@/components/index/left-login';
import RightLogin from '@/components/index/right-login';
import { useAuth } from '@/context/auth-context';

export default function LoginModal() {
  const {
    auth,
    loginModalToggle,
    setLoginModalToggle,
    switchHandler,
    isOnLogin,
    setIsOnLogin,
  } = useAuth();

  return (
    <>
      {loginModalToggle && (
        <>
          <div
            className={`overflow-y-auto modal ${
              loginModalToggle ? 'opacity-100' : 'opacity-0 hidden'
            }`}
            style={{ pointerEvents: 'auto' }}
          >
            <div className=" w-11/12 max-w-[100%] md:max-w-[68%] lg:max-w-[54%] xl:max-w-[50%]  min-h-[450px] items-center flex modal-box bg-light p-0 rounded-3xl">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => {
                  isOnLogin ? '' : switchHandler();
                  setLoginModalToggle(false);
                }}
                className="absolute z-30 btn btn-sm text-dark btn-circle btn-ghost right-2 top-2"
              >
                ✕
              </button>
              {/* if there is a button in form, it will close the modal */}
              <div className="relative flex flex-wrap w-full min-h-[610px] md:min-h-[460px]">
                {isOnLogin ? (
                  <>
                    {/* LeftSide */}
                    <LeftLogin
                      isOnLogin={isOnLogin}
                      switchHandler={switchHandler}
                    />
                  </>
                ) : (
                  <>
                    {/* RightSide */}
                    <RightLogin
                      isOnLogin={isOnLogin}
                      switchHandler={switchHandler}
                    />
                  </>
                )}

                {/* Slider */}
                <div
                  style={
                    isOnLogin
                      ? { backgroundImage: 'url(/loginBackground.png)' }
                      : {
                          backgroundImage: 'url(/loginBackgroundReverse.png)',
                        }
                  }
                  className={`${
                    isOnLogin
                      ? 'py-10 rounded-l-[100px] '
                      : 'translate-x-[-101%] py-[88px] rounded-r-[100px] '
                  } duration-1000 ease-in-out  w-1/2 absolute right-0 h-full bg-cover  items-center p-4  text-center hidden md:block z-20 `}
                >
                  <div className="flex flex-col items-center justify-center ">
                    <div
                      className={`font-bol text-h1 text-dark ${
                        isOnLogin ? 'px-10 2xl:px-20' : ''
                      }`}
                    >
                      {`${isOnLogin ? 'Hello, Friend!' : '歡迎回來！  '} `}
                    </div>
                    <div className="px-4 mt-10 font-bold text-[19px] text-dark">
                      註冊並開始認識新朋友及使用網站所有功能！
                    </div>
                    <button
                      onClick={switchHandler}
                      className="py-2 px-4 font-bold mt-10 max-w-[180px] rounded-xl text-primary w-full border-2   md:py-2 btn-primary bg-dark border-dark hover:shadow-xl3"
                    >
                      {`${isOnLogin ? '會員註冊' : '會員登入'} `}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
