import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';

export default function RegisterAcc() {
  const { auth, setLoginModalToggle, switchHandler, isOnLogin, setIsOnLogin } =
    useAuth();

  return (
    <>
      <div
        className="flex flex-col items-center justify-end bg-no-repeat bg-cover"
        style={{
          backgroundImage: 'url(/index_background.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        {auth.id ? (
          <>
            <div className="flex flex-col items-center justify-center mb-[250px]">
              <Link href="/date">
                <button className="w-40 py-1 my-2 text-black border-2 rounded-full md:w-80 h-[55px] md:py-2 btn-primary bg-primary border-primary hover:shadow-xl3">
                  開始配對
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center mb-[250px]">
              <button
                onClick={() => setLoginModalToggle(true)}
                className="w-40 py-1 my-2 text-black border-2 rounded-full md:w-80 h-[55px] md:py-2 btn-primary bg-primary border-primary hover:shadow-xl3"
              >
                登入會員
              </button>
              <button
                onClick={() => {
                  setIsOnLogin(false);
                  setLoginModalToggle(true);
                }}
                className="w-40 py-1 my-2 bg-black border-2 rounded-full md:w-80 h-[55px] md:py-2 border-primary text-primary hover:shadow-xl3"
              >
                建立帳號
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
