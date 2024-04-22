import { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/account-center/sidebar/sidebar';
import PageTitle from '@/components/page-title';
import Breadcrumbs from '@/components/account-center/breadcrumbs/breadcrumbs';
import BurgerMenu from '@/components/account-center/burgermenu/burger-menu';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useNotify } from '@/context/use-notify';
import {
  API_SERVER,
  ACCOUNT_EDIT_GET,
  ACCOUNT_EDIT_PUT,
  ACCOUNT_EDIT_AVATAR_PUT,
} from '@/components/config/api-path';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { editSchema } from '@/components/schemas';
import { useLoader } from '@/context/use-loader';
import EditLoader from '@/components/account-center/loader/edit-loader';

export default function AccountEdit({ onPageChange }) {
  const pageTitle = '會員中心';
  const currentPage = '資料編輯';
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { notifyPromise, notifySuccess, notifyError } = useNotify();
  const { userAvatar, setUserAvatar, getAuthHeader, checkAuth } = useAuth();

  const [currentDate, setCurrentDate] = useState('');
  const [userInf, setUserInf] = useState({
    email: '',
    username: '',
    gender: '',
    mobile: '',
    birthday: '',
    fav1: '',
    fav2: '',
    profile: '',
  });
  const [favBarList, setFavBarList] = useState([]);
  const [favMovieList, setFavMovieList] = useState([]);
  const { close, isLoading } = useLoader();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatar = async (formData) => {
    // console.log(formData);
    try {
      const r = await fetch(`${ACCOUNT_EDIT_AVATAR_PUT}/${router.query.sid}`, {
        method: 'POST',
        body: formData,
        headers: { ...getAuthHeader() },
      });
      const result = await r.json();

      notifySuccess(result.msg);
    } catch (e) {
      console.log(e);
      notifyError(result.msg);
    }
  };

  const handleFileChange = async (e) => {
    const file = await e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setUserAvatar(fileUrl);
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', router.query.sid);
      const formData1 = new FormData(document.form1);
      // console.log('formData:', formData);
      // console.log(formData.get('avatar')); // 获取 'avatar' 字段的值
      // console.log(formData.get('userId')); // 获取 'userId' 字段的值
      // console.log('formData1:', formData1);
      // for (let pair of formData1.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      handleAvatar(formData);
    }
  };

  const initValue = {
    email: userInf.email || '',
    username: userInf.username || '',
    gender: userInf.gender || '請選擇',
    mobile: userInf.mobile || '',
    birthday: userInf.birthday || '',
    fav1: userInf.fav1 || '請選擇', // 將 null 替換為 "請選擇",
    fav2: userInf.fav2 || '請選擇', // 將 null 替換為 "請選擇",
    profile: userInf.profile || '',
    avatar: userAvatar,
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initValue,
    validationSchema: editSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const fetchData = async () => {
        try {
          const r = await fetch(`${ACCOUNT_EDIT_PUT}/${router.query.sid}`, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
          });
          return await r.json();
        } catch (error) {
          throw error;
        }
      };

      notifyPromise(fetchData, {
        loading: '正在保存...',
        success: (result) => {
          if (!result.success) {
            throw result.msg;
          }
          router.push(`/account/index/${router.query.sid}`);
          return result.msg;
        },
        error: (error) => `${error.toString()}`,
      });
    },
  });

  useEffect(() => {
    if (!router.isReady) return;
    const fecthEditData = async () => {
      try {
        const r = await fetch(`${ACCOUNT_EDIT_GET}/${router.query.sid}`, {
          headers: { ...getAuthHeader() },
        });
        const result = await r.json();

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
            profile_content,
          } = result.data;

          setUserInf({
            ...userInf,
            email: email,
            username: username,
            gender: gender || '',
            mobile: mobile,
            birthday: birthday,
            fav1: bar_type_name,
            fav2: movie_type,
            profile: profile_content,
          });

          setFavBarList([...result.barType[0].map((obj) => obj.bar_type_name)]);

          setFavMovieList([
            ...result.movieType[0].map((obj) => obj.movie_type),
          ]);

          setUserAvatar(avatar);
        } else {
          toast.error(result.error, {
            duration: 1500,
          });
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    };

    //進頁面做授權確認，router的query有改會調用fetchCheck
    const fetchCheck = async () => {
      const result = await checkAuth(router.query.sid);
      if (!result.success) {
        toast.error(result.error, { duration: 1500 });
        router.push('/');
        return;
      }

      //進頁面做授權確認，授權通過，接收user的待編輯資料
      fecthEditData();
      close(1.5);
    };
    fetchCheck();
  }, [router.query]);

  useEffect(() => {
    onPageChange(pageTitle);
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    const currentDateStr = `${year}-${month}-${day}`;
    setCurrentDate(currentDateStr);
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
            <div className="flex align-middle border-b border-solid menu-title ps-0">
              <BurgerMenu />
              <div className="text-2xl text-light ms-3">{currentPage}</div>
            </div>
            {/* 小漢堡END */}

            <div className="text-sm breadcrumbs ms-2">
              <Breadcrumbs currentPage={currentPage} />
            </div>

            {isLoading ? (
              <EditLoader />
            ) : (
              <>
                {' '}
                {/* CONTENT1 START */}
                <form name="form1" onSubmit={handleSubmit}>
                  <div className="flex flex-col h-full mb-4 lg:mx-1 xl:mx-1 2xl:mx-12 lg:flex-row card bg-base-300 rounded-box place-items-center">
                    {/* 大頭照START */}
                    <div className="flex flex-col items-center justify-center rounded-full basis-1/2">
                      <div className="mx-4 mt-4 ">
                        <img
                          className="object-cover w-48 h-48 rounded-full cursor-pointer"
                          src={
                            userAvatar
                              ? userAvatar
                              : `${API_SERVER}/avatar/defaultAvatar.jpg`
                          }
                          alt="會員大頭照"
                          onClick={handleImageClick}
                        />
                        <input
                          type="file"
                          name="avatar"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="max-h-[48px] w-[200px] mx-4 my-4 lg:mb-4 ">
                        <p className="mb-4 text-xs text-center md:text-sm">
                          點擊頭像可直接上傳
                        </p>
                        <p className="text-xs text-center md:text-sm">
                          檔案大小： 最大1MB
                        </p>
                        <p className="text-xs text-center md:text-sm">
                          檔案限制： .JPEG, .PNG
                        </p>
                      </div>
                    </div>
                    {/* 大頭照END */}

                    <div className="container basis-1/2">
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start my-7">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3 ">
                          電子郵件：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <input
                            type="mail"
                            placeholder="Type here"
                            value={values.email}
                            readOnly
                            className={`input-sm input input-bordered text-slate-700 max-w-[320px] `}
                          />
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mb-7">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                          暱稱：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <input
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={` input-sm input input-bordered max-w-[320px] ${
                              errors.username && touched.username
                                ? 'input-error '
                                : ''
                            }`}
                          />
                          {errors.username && touched.username && (
                            <p className="absolute bottom-[-20px] mx-4 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.username}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mb-7">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                          手機號碼：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <input
                            type="tel"
                            value={values.mobile || ''}
                            name="mobile"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="max-w-xs basis-1/2 lg:basis-2/3 input-sm input input-bordered max-h-[32px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mb-7">
                        <p className="text-center ms-2 basis-1/2 lg:ms-0 lg:basis-1/3">
                          性別：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <select
                            type="text"
                            value={values.gender}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              errors.gender && touched.gender
                                ? 'select-error '
                                : ''
                            } max-w-xs min-w-[180px] sm:min-w-[150px] lg:min-w-[180px] select select-sm select-bordered`}
                          >
                            <option value={'請選擇'} disabled>
                              請選擇
                            </option>
                            <option value={'男'}>男</option>
                            <option value={'女'}>女</option>{' '}
                          </select>
                          {errors.gender && touched.gender && (
                            <p className="absolute bottom-[-20px] mx-4 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.gender}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mb-7">
                        <p className="text-center ms-2 basis-1/2 sm:basis-1/2 lg:ms-0 lg:basis-1/3">
                          生日：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <input
                            max={currentDate} // 設置日期的最大值為當前日期
                            type="date"
                            value={values.birthday || ''}
                            name="birthday"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              errors.birthday && touched.birthday
                                ? 'border-red-500 '
                                : ''
                            } max-w-xs min-w-[180px] sm:min-w-[150px] lg:min-w-[180px] basis-1/2 sm:basis-1/2 lg:basis-2/3 input input-sm input-bordered  max-h-[32px]`}
                          />
                          {errors.birthday && touched.birthday && (
                            <p className="absolute bottom-[-20px] mx-4 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.birthday}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mb-7">
                        <p className="text-center ms-2 basis-1/2 sm:basis-1/2 lg:ms-0 lg:basis-1/3">
                          酒吧喜好：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <select
                            type="text"
                            value={values.fav1 || ''}
                            name="fav1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              errors.fav1 && touched.fav1
                                ? 'border-red-500 '
                                : ''
                            } max-w-xs min-w-[180px] sm:min-w-[150px] lg:min-w-[180px] basis-1/2 sm:basis-1/2 lg:basis-2/3 select select-sm select-bordered  max-h-[32px]`}
                          >
                            <option disabled>請選擇</option>
                            {favBarList.map((v, i) => (
                              <option value={v} key={i}>
                                {v}
                              </option>
                            ))}
                          </select>
                          {errors.fav1 && touched.fav1 && (
                            <p className="absolute bottom-[-20px] mx-4 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.fav1}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center mx-4 lg:justify-start mb-7">
                        <p className="text-center ms-2 basis-1/2 sm:basis-1/2 lg:ms-0 lg:basis-1/3">
                          電影喜好：
                        </p>
                        <div className="relative flex flex-col basis-1/2 lg:basis-2/3">
                          <select
                            value={values.fav2 || ''}
                            name="fav2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${
                              errors.fav1 && touched.fav1
                                ? 'border-red-500 '
                                : ''
                            } max-w-xs min-w-[180px] sm:min-w-[150px] lg:min-w-[180px] basis-1/2 sm:basis-1/2 lg:basis-2/3 select select-sm select-bordered  max-h-[32px]`}
                          >
                            <option disabled>請選擇</option>
                            {favMovieList.map((v, i) => (
                              <option value={v} key={i}>
                                {v}
                              </option>
                            ))}
                          </select>
                          {errors.fav2 && touched.fav2 && (
                            <p className="absolute bottom-[-20px] mx-4 text-red-500 basis-full lg:justify-start text-[12px]">
                              {errors.fav2}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CONTENT1 END */}

                  <div className="divider"></div>

                  {/* CONTENT2 START */}
                  <div className="flex flex-col justify-start h-full mb-20 lg:mx-1 xl:mx-1 2xl:mx-12 bg-base-300 rounded-box">
                    <div className="text-xl ms-2 text-light menu-title">
                      關於我：
                    </div>
                    <div className="flex flex-col justify-center mx-4 mt-4 mb-8 md: 2xl:mx-16">
                      <textarea
                        value={values.profile}
                        placeholder="輸入些甚麼..."
                        name="profile"
                        className="w-full h-48 textarea textarea-bordered textarea-lg text-light"
                        onChange={handleChange}
                      ></textarea>
                      <div className="flex justify-end mt-[30px]">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          htmlFor="edit_success_modal"
                          className="btn w-1/2 min-h-[40px] h-[40px] sm:w-[140px] rounded-full border-dark  btn-primary  bg-primary hover:bg-primary hover:shadow-xl3 hover:border-primary font-bold"
                        >
                          編輯完成
                        </button>
                        <Link
                          href={`/account/index/${router.query.sid}`}
                          className="btn w-1/2 min-h-[40px] h-[40px] sm:w-[140px] sm:ml-4  rounded-full  btn-outline bg-dark btn-md hover:bg-dark text-primary hover:text-primary hover:shadow-xl3 hover:border-dark"
                        >
                          取消編輯
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* CONTENT2 END */}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
