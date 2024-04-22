import { useState, useEffect } from 'react';
import Sidebar from '@/components/account-center/sidebar/sidebar';
import PageTitle from '@/components/page-title';
import Breadcrumbs from '@/components/account-center/breadcrumbs/breadcrumbs';
import BurgerMenu from '@/components/account-center/burgermenu/burger-menu';
// import ChangePWSuccessModal from '@/components/account-center/modal/change-pw-success-modal';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { changePasswordSchema } from '@/components/schemas';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { ACCOUNT_CHANGE_PWD_PUT } from '@/components/config/api-path';
import { useNotify } from '@/context/use-notify';
import { useLoader } from '@/context/use-loader';
import CPLoader from '@/components/account-center/loader/ch-pwd-loader';
import toast from 'react-hot-toast';

export default function AccountPasswordChange({ onPageChange }) {
  const [showOldPWD, setOldShowPWD] = useState(false);
  const [showNewPWD, setNewShowPWD] = useState(false);
  const [showConfirmNewPWD, setConfirmNewShowPWD] = useState(false);
  const { close, isLoading } = useLoader();
  const { auth, getAuthHeader, checkAuth } = useAuth();
  const { notifyPromise, notifySuccess, notifyError } = useNotify();
  const router = useRouter();

  const handleShowOldPWD = () => {
    setOldShowPWD(!showOldPWD);
  };
  const handleShowNewPWD = () => {
    setNewShowPWD(!showNewPWD);
  };
  const handleShowConfirmNewPWD = () => {
    setConfirmNewShowPWD(!showConfirmNewPWD);
  };

  const pageTitle = '會員中心';
  const currentPage = '更改密碼';

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
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      const fetchChangePWD = async () => {
        try {
          const r = await fetch(`${ACCOUNT_CHANGE_PWD_PUT}/${auth.id}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
          });
          const result = await r.json();
          return result;
        } catch (error) {
          throw error;
        }
      };

      notifyPromise(fetchChangePWD, {
        loading: '正在保存...',
        success: (result) => {
          if (!result.success) {
            throw result.error;
          }
          router.push(`/account/index/${auth.id}`);
          return result.msg;
        },
        error: (error) => `${error.toString()}`,
      });

      // try {
      // } catch (e) {
      //   console.log('error:', e);
      // }
    },
  });

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
                <span className="text-[10px] max-h-[32px] sm:text-[12px] text-red-500 font-thin ml-2">
                  輸入8-16 個字元，需包含大小寫英文、數字及特殊符號。
                </span>
              </div>
            </div>
            {/* 小漢堡END */}

            <div className="text-sm breadcrumbs ms-2">
              <Breadcrumbs currentPage={currentPage} />
            </div>

            {isLoading ? (
              <CPLoader />
            ) : (
              <>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  {/* CONTENT1 START */}
                  <div className="flex flex-col h-full lg:mx-1 xl:mx-1 2xl:mx-12 lg:flex-row card bg-base-300 rounded-box place-items-center">
                    <div className="container">
                      <div className="flex flex-row items-center justify-center mx-4 me-4 sm:me-16 lg:justify-start mt-7 ">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 ">
                          舊密碼：
                        </p>
                        <div className="relative basis-1/2">
                          <input
                            value={values.password}
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            type={showOldPWD ? 'text' : 'password'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`w-full input-sm input input-bordered ${
                              errors.password && touched.password
                                ? 'input-error'
                                : ''
                            }`}
                          />

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className={` ${
                              touched.password ? 'block' : 'hidden'
                            } absolute right-4 w-5 h-5 cursor-pointer top-[6px] opacity-70 text-dark`}
                            onClick={handleShowOldPWD}
                          >
                            {showOldPWD ? <FaEyeSlash /> : <FaEye />}
                          </svg>

                          {errors.password && touched.password && (
                            <p className="absolute bottom-[-21px] mx-2 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.password}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mt-7 me-4 sm:me-16">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 ">
                          新密碼：
                        </p>
                        <div className="relative basis-1/2">
                          <input
                            value={values.newPassword}
                            name="newPassword"
                            id="newPassword"
                            autoComplete="new-password"
                            type={showNewPWD ? 'text' : 'password'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`w-full input-sm input input-bordered ${
                              errors.newPassword && touched.newPassword
                                ? 'input-error'
                                : ''
                            }`}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className={` ${
                              touched.newPassword ? 'block' : 'hidden'
                            } absolute right-4 w-5 h-5 cursor-pointer top-[6px] opacity-70 text-dark`}
                            onClick={handleShowNewPWD}
                          >
                            {showNewPWD ? <FaEyeSlash /> : <FaEye />}
                          </svg>
                          {errors.newPassword && touched.newPassword && (
                            <p className="absolute bottom-[-21px] mx-2 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.newPassword}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mt-7 me-4 sm:me-16">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 ">
                          密碼確認：
                        </p>
                        <div className="relative basis-1/2">
                          <input
                            value={values.confirmNewPassword}
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            autoComplete="new-password"
                            type={showConfirmNewPWD ? 'text' : 'password'}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`w-full input-sm input input-bordered ${
                              errors.confirmNewPassword &&
                              touched.confirmNewPassword
                                ? 'input-error'
                                : ''
                            }`}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className={` ${
                              touched.confirmNewPassword ? 'block' : 'hidden'
                            } absolute right-4 w-5 h-5 cursor-pointer top-[6px] opacity-70 text-dark`}
                            onClick={handleShowConfirmNewPWD}
                          >
                            {showConfirmNewPWD ? <FaEyeSlash /> : <FaEye />}
                          </svg>
                          {errors.confirmNewPassword &&
                            touched.confirmNewPassword && (
                              <p className="absolute bottom-[-21px] mx-2 text-red-500 basis-full lg:justify-start text-[12px]">
                                {errors.confirmNewPassword}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="flex justify-end mt-[30px] mx-4 mb-8 sm:mx-14 md:mx-16 lg:mx-14 xl:mx-16 2xl:mx-16">
                        <div className="flex flex-col justify-center sm:flex-row sm:justify-end basis-full sm:basis-2/3">
                          <button
                            type="submit"
                            className="btn min-h-[40px] h-[40px] mt-4  sm:w-[140px] rounded-full border-dark  btn-primary  bg-primary hover:bg-primary hover:shadow-xl3 hover:border-primary font-bold"
                          >
                            確定更改
                          </button>
                          <Link
                            href={`/account/index/${auth.id}`}
                            className="btn min-h-[40px] h-[40px]  mt-4 sm:w-[140px] sm:ml-4 rounded-full  btn-outline bg-dark btn-md hover:bg-dark text-primary hover:text-primary hover:shadow-xl3 hover:border-dark"
                          >
                            取消更改
                          </Link>

                          {/* <ChangePWSuccessModal /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CONTENT1 END */}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
