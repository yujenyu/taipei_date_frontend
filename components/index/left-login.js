import React, { useState } from 'react';
// import Link from 'next/link';
import PasswordForget from './password-forget';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { getAuthGoogle } from '@/context/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GOOGLE_LOGIN } from '@/components/config/api-path';

export default function LeftLogin({ isOnLogin, switchHandler }) {
  const [googleUser, setgoogleUser] = useAuthState(getAuthGoogle);
  const [passwordForgetBtn, setPasswordForgetBtn] = useState(false);
  const {
    auth,
    storageKey,
    setAuth,
    login,
    loginModalToggle,
    setLoginModalToggle,
  } = useAuth();
  const router = useRouter();

  const [showPWD, setShowPWD] = useState(false);
  const handleShowPWD = () => {
    setShowPWD(!showPWD);
  };

  const provider = new GoogleAuthProvider();
  const loginByGoogle = async () => {
    const result = await signInWithPopup(getAuthGoogle, provider);
    const user = await result.user;

    const fetchGoogleLogin = async (user) => {
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      const r = await fetch(GOOGLE_LOGIN, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonResult = await r.json();

      if (jsonResult.success) {
        let data = {
          id: jsonResult.data.id,
          email: jsonResult.data.email,
          token: jsonResult.data.token,
        };
        localStorage.setItem(storageKey, JSON.stringify(data));
        setAuth(data);
        console.log(jsonResult);
        return jsonResult;
      }
    };

    try {
      toast.promise(fetchGoogleLogin(user), {
        loading: '登入中...',
        success: (jsonResult) => {
          if (!jsonResult.success) {
            throw new Error('登入時出現錯誤');
          }
          if (jsonResult.data.getPointLogin) {
            toast.success('登入獲得10積分', { duration: 1500 });
          }
          setShowPWD(false);
          setLoginModalToggle(false);
          router.push('/');
          return '登入成功';
        },
        error: (e) => {
          return `${e}`;
        },
      });
    } catch (e) {
      console.log('error:', e);
    }

    // fetchGoogleLogin(user);
    // console.log('user:', user);
    // console.log('googleUser:', googleUser);
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        toast.promise(login(values.email, values.password), {
          loading: '登入中',
          success: (result) => {
            if (!result.success) {
              throw new Error(result.error);
            }
            resetForm();
            setShowPWD(false);
            setLoginModalToggle(false);
            if (result.data.getPointLogin) {
              toast.success('登入獲得10積分', { duration: 1500 });
            }
            router.push('/');
            return '登入成功';
          },
          error: (e) => {
            return `${e}`;
          },
        });
      } catch (e) {
        console.log('error:', e);
      }
    },
  });

  return (
    <>
      {passwordForgetBtn ? (
        <PasswordForget
          setPasswordForgetBtn={setPasswordForgetBtn}
          switchHandler={switchHandler}
        />
      ) : (
        <div
          className={`flex flex-col w-full min-h-[399px] md:w-1/2 my-10 ease-in-out duration-1000  ${
            isOnLogin ? '' : ' translate-x-[100%] '
          } `}
        >
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-4 lg:px-8">
            <p className="font-bold text-center text-h3 text-dark">會員登入</p>
            <form
              className="flex flex-col pt-6"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="flex flex-col">
                <label
                  className={`${
                    errors.email && touched.email ? 'input-error ' : ''
                  } flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 min-w-[14px] opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="grow text-slate-700"
                    placeholder="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    autoComplete="email"
                  />
                </label>
                {errors.email && touched.email ? (
                  <p className="text-[12px] text-red-500 ms-6 mb-2 mt-1">
                    {errors.email}
                  </p>
                ) : (
                  <p className="mt-[22px] mb-2 "> </p>
                )}
              </div>
              <div className="flex flex-col ">
                <label
                  className={`${
                    errors.password && touched.password ? 'input-error ' : ''
                  } relative flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 min-w-[14px] opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type={showPWD ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="grow text-dark"
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    autoComplete="current-password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={`${
                      touched.password ? 'block' : 'hidden'
                    } w-5 h-5 min-w-[14px] cursor-pointer opacity-70 text-dark absolute right-4`}
                    onClick={handleShowPWD}
                  >
                    {showPWD ? <FaEyeSlash /> : <FaEye />}
                  </svg>
                </label>
                {errors.password && touched.password ? (
                  <p className="text-[12px] text-red-500 ms-6 mb-2 mt-1">
                    {errors.password}
                  </p>
                ) : (
                  <p className="mt-[22px] mb-2 "> </p>
                )}
              </div>
              <div className="text-center ">
                <p>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordForgetBtn(true);
                    }}
                    className="font-semibold underline cursor-pointer text-dark"
                  >
                    忘記密碼嗎?
                  </a>
                </p>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full px-4 py-2 mt-6 font-semibold text-center transition duration-200 ease-in bg-white border-2 rounded-full md:mx-auto text-dark border-slate-200 hover:bg-slate-200 hover:border-slate-400 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                <span className="w-full">登入</span>
              </button>
            </form>
            <div className="py-4 text-center text-slate-300">
              <p>Or</p>
            </div>
            <a
              onClick={loginByGoogle}
              className="flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center transition duration-200 ease-in bg-white border-2 rounded-full shadow-md cursor-pointer border-slate-200 text-dark md:mx-auto hover:bg-slate-200 hover:border-slate-400 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              <FcGoogle className="me-4 min-w-[18px] " />
              Google帳號登入
            </a>
            <button
              onClick={switchHandler}
              className="w-1/2 px-4 py-2 mx-auto font-bold border-2 rounded-xl mt-14 text-primary btn-primary bg-dark border-dark hover:shadow-xl3 md:hidden"
            >
              會員註冊
            </button>
          </div>
        </div>
      )}
    </>
  );
}
