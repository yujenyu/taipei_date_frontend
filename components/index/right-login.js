import { useFormik } from 'formik';
import React, { useState } from 'react';
import { registerSchema } from '../schemas';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function RightLogin({ isOnLogin, switchHandler }) {
  const { auth, register } = useAuth();
  const router = useRouter();
  const [showPWD, setShowPWD] = useState(false);
  const [showPWD2, setShowPWD2] = useState(false);
  const handleShowPWD = () => {
    setShowPWD(!showPWD);
  };
  const handleShowPWD2 = () => {
    setShowPWD2(!showPWD2);
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        toast.promise(register(values.name, values.email, values.password), {
          loading: '註冊中',
          success: (result) => {
            if (!result.success) {
              throw new Error(result.error);
            }
            switchHandler();
            resetForm();
            return '註冊成功';
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
      <div
        className={`flex flex-col min-h-[462px] ease-in-out w-full md:translate-x-[0%] md:w-1/2 mt-2 mb-2 duration-1000  ${
          isOnLogin ? '' : 'translate-x-[0%] md:translate-x-[100%] '
        } `}
      >
        <div
          className={`flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-4 lg:px-8 `}
        >
          <p className="font-bold text-center text-h3 text-dark">建立帳戶</p>
          <div className="pt-2 text-center">
            <p className="font-semibold text-red-500 text-[11px] mb-2">
              輸入 8-16 個字元，需包含大小寫英文、數字及特殊符號。
            </p>
          </div>
          <form
            className="flex flex-col "
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col ">
              <label
                className={`flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300 ${
                  errors.name && touched.name ? 'input-error ' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 min-w-[14px] opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  id="name"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  type="text"
                  className={`grow text-slate-700`}
                  placeholder="Username"
                />
              </label>
              {errors.name && touched.name ? (
                <p className="text-[12px] text-red-500 ms-4 mb-2 mt-1">
                  {errors.name}
                </p>
              ) : (
                <p className="mt-[22px] mb-2 "> </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300 ${
                  errors.email && touched.email ? 'input-error ' : ''
                }`}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  className={`grow text-slate-700 `}
                  placeholder="Email"
                  autoComplete="email"
                />
              </label>
              {errors.email && touched.email ? (
                <p className="text-[12px] text-red-500 ms-4  mb-2 mt-1">
                  {errors.email}
                </p>
              ) : (
                <p className="mt-[22px] mb-2 "> </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`relative flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300 ${
                  errors.password && touched.password ? 'input-error ' : ''
                }`}
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
                  id="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  type={showPWD ? 'text' : 'password'}
                  className={`grow text-slate-700`}
                  placeholder="password"
                  autoComplete="new-password"
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
                <p className="text-[12px] text-red-500 ms-4 mb-2 mt-1">
                  {errors.password}
                </p>
              ) : (
                <p className="mt-[22px] mb-2 "> </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`relative flex items-center gap-2 rounded-full input h-[37px] input-bordered bg-slate-300 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? 'input-error '
                    : ''
                }`}
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
                  id="confirmPassword"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  type={showPWD2 ? 'text' : 'password'}
                  className={`grow text-slate-700`}
                  placeholder="ConfirmPassword"
                  autoComplete="new-password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className={`${
                    touched.confirmPassword ? 'block' : 'hidden'
                  } w-5 h-5 min-w-[14px] cursor-pointer opacity-70 text-dark absolute right-4`}
                  onClick={handleShowPWD2}
                >
                  {showPWD2 ? <FaEyeSlash /> : <FaEye />}
                </svg>
              </label>
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className="text-[12px] text-red-500 ms-4 mb-2 mt-1">
                  {errors.confirmPassword}
                </p>
              ) : (
                <p className="mt-[22px] mb-2 "> </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full px-4 py-2 mb-4 font-semibold text-center transition duration-200 ease-in bg-white border-2 rounded-full md:mx-auto text-dark border-slate-200 hover:bg-slate-200 hover:border-slate-400 focus:ring-slate-500 focus:ring-offset-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="w-full">註冊</span>
            </button>
          </form>

          <button
            onClick={switchHandler}
            className="w-1/2 px-4 py-2 mx-auto mt-8 mb-4 font-bold border-2 rounded-xl md:mt-14 text-primary btn-primary bg-dark border-dark hover:shadow-xl3 md:hidden"
          >
            會員登入
          </button>
        </div>
      </div>
    </>
  );
}
