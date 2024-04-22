import { useState, useEffect } from 'react';
import Sidebar from '@/components/account-center/sidebar/sidebar';
import PageTitle from '@/components/page-title';
import Breadcrumbs from '@/components/account-center/breadcrumbs/breadcrumbs';
import BurgerMenu from '@/components/account-center/burgermenu/burger-menu';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import {
  ACCOUNT_RECORD_POINT_GET,
  ACCOUNT_RECORD_GAME,
  API_SERVER,
} from '@/components/config/api-path';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AccountRecord({ onPageChange }) {
  const pageTitle = '會員中心';
  const currentPage = '紀錄查詢';

  const [gameRecordOpen, setGameRecordOpen] = useState(false);
  const router = useRouter();
  const { auth, userAvatar, setUserAvatar, getAuthHeader, checkAuth } =
    useAuth();
  const [recordListPoint, setRecordListPoint] = useState({
    rows: [],
    page: 0,
    totalPages: 0,
  });
  const [pointSource, setPointSource] = useState('選擇獲得來源');
  const [dateSortToggle, setDateSortToggle] = useState(false);

  const [recordListGame, setRecordListGame] = useState({
    rows: [],
    page: 0,
    totalPages: 0,
  });

  //積分紀錄的處理分頁按鈕
  const handlePrevPage = (e) => {
    e.preventDefault();
    const prevPage = recordListPoint.page - 1;
    if (prevPage >= 1) {
      setRecordListPoint((prevState) => ({
        ...prevState,
        page: prevPage,
      }));

      // 獲取當前路由的 query string
      const { page, ...queryWithoutPage } = router.query;
      console.log('router.query:', router.query);
      console.log('queryWithoutPage:', queryWithoutPage);

      const query = { ...queryWithoutPage, page: prevPage };

      // 構建新的 URL
      const queryString = new URLSearchParams(query).toString();
      console.log('prevPageQS:', queryString);

      // 更新路由的 query string
      router.push(
        {
          pathname: router.pathname, // 將 pathname 設置到 url 中
          query: queryString, // 將 query 設置到 url 中
        },
        undefined,
        { scroll: false }
      ); // 將 scroll 選項設置到 options 中，undefined 表示忽略 as 參數
    }
  };
  const handleNextPage = (e) => {
    e.preventDefault();
    const nextPage = recordListPoint.page + 1;
    if (nextPage <= recordListPoint.totalPages) {
      setRecordListPoint((prevState) => ({
        ...prevState,
        page: nextPage,
      }));
      // 獲取當前路由的 query string
      const query = { ...router.query, page: nextPage };

      // 構建新的 URL
      const queryString = new URLSearchParams(query).toString();
      console.log('NextPageQS:', queryString);

      // 更新路由的 query string
      router.push(
        {
          pathname: router.pathname, // 將 pathname 設置到 url 中
          query: queryString, // 將 query 設置到 url 中
        },
        undefined,
        { scroll: false }
      ); // 將 scroll 選項設置到 options 中，undefined 表示忽略 as 參數
    }
  };

  //處理積分的來源選擇
  const handlePointSource = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === '選擇獲得來源') {
      return;
    }
    setPointSource(selectedValue);
    // console.log('選到這個值', pointSource);
  };

  useEffect(() => {
    if (pointSource === '選擇獲得來源') {
      return;
    }
    let newSid = router.query.sid;

    let newQuery = { sid: newSid, pointSource: pointSource };

    console.log('改變路經:nQ:', newQuery);

    // 構建新的 URL
    const queryString = new URLSearchParams(newQuery).toString();
    console.log('改變路經:nQS:', queryString);

    // 更新路由的 query string
    router.push(
      {
        pathname: router.pathname, // 將 pathname 設置到 url 中
        query: queryString, // 將 query 設置到 url 中
      },
      undefined,
      { scroll: false }
    ); // 將 scroll 選項設置到 options 中，undefined 表示忽略 as 參數
  }, [pointSource]);

  const handleDateSort = () => {
    setDateSortToggle(!dateSortToggle);
  };

  useEffect(() => {
    let sort = 'DESC';
    sort = dateSortToggle ? 'ASC' : 'DESC';

    console.log('useEffect 目前sort:', sort);

    let newSid = router.query.sid;
    let newQuery = {};

    if (pointSource !== '選擇獲得來源') {
      newQuery = { sid: newSid, sort: sortDate };
    } else {
      newQuery = { sid: newSid, pointSource: pointSource, sortDate: sort };
    }

    console.log('改變路經:nQ:', newQuery);

    // 構建新的 URL
    const queryString = new URLSearchParams(newQuery).toString();
    console.log('改變路經:nQS:', queryString);

    // 更新路由的 query string
    router.push(
      {
        pathname: router.pathname, // 將 pathname 設置到 url 中
        query: queryString, // 將 query 設置到 url 中
      },
      undefined,
      { scroll: false }
    ); // 將 scroll 選項設置到 options 中，undefined 表示忽略 as 參數
  }, [dateSortToggle]);

  useEffect(() => {
    if (!router.isReady || auth.id === 0 || router.query.sid === undefined)
      return;

    const fetchPointRecord = async () => {
      // console.log('${location.search}是:', location.search);
      const query = {
        ...router.query,
        pointSource: pointSource, // 添加 pointSource 到 query 对象中
      };
      const queryString = new URLSearchParams(query).toString();
      console.log('qS:', queryString);
      // qS: page=2&sid=1&pointSource=%E7%99%BB%E5%85%A5%E7%8D%B2%E5%BE%97
      console.log('router.query:', router.query);
      // page: '2';
      // sid: '1';
      console.log('location.search:', location.search);
      // location.search: ?page=2

      const r = await fetch(
        `${ACCOUNT_RECORD_POINT_GET}/${router.query.sid}?${queryString}`,
        {
          headers: { ...getAuthHeader() },
        }
      );
      const result = await r.json();
      if (!result.success) {
        // alert('error to fetch');
        return;
      }
      // console.log('fetchpointrecord:', result.output);
      setRecordListPoint({
        ...recordListPoint,
        rows: result.output.data,
        page: result.page,
        totalPages: result.totalPages,
      });
      // console.log('fetchpointrecord2:', recordListPoint);
    };

    fetchPointRecord();
  }, [router, auth]);

  //處理紀錄類型切換按鈕
  const handleToggleChange = (e) => {
    setGameRecordOpen(e.target.checked);
  };

  useEffect(() => {
    //gameRecordOpen 開啟時 才會fetch
    console.log('gameRecordIsOpen');

    if (!gameRecordOpen) {
      return;
    }
    console.log('gameRecordIsOpen and then fetch');

    //定義 要遊戲紀錄的方法
    const fetchGameRecord = async () => {
      try {
        const r = await fetch(
          `${ACCOUNT_RECORD_GAME}/${router.query.sid}${location.search}`,
          {
            headers: { ...getAuthHeader() },
          }
        );
        const result = await r.json();
        console.log('遊戲紀錄資料:', result);
        if (!result.output.success) {
          // alert('error to fetch');
          return;
        }
      } catch (error) {
        console.log('fetchGameRecord has error:', error);
      }

      //要求遊戲紀錄
      fetchGameRecord();
    };
  }, [gameRecordOpen]);

  // useEffect(() => {
  //   onPageChange(pageTitle);
  //   // 在路由跳轉前保存滾動位置
  //   const handleRouteChangeStart = () => {
  //     window.scrollTo(0, window.scrollY); // 保存當前的滾動位置
  //   };

  //   // 監聽路由跳轉事件
  //   router.events.on('routeChangeStart', handleRouteChangeStart);

  //   return () => {
  //     // 卸載組件時取消監聽
  //     router.events.off('routeChangeStart', handleRouteChangeStart);
  //   };
  //   // fetchPointRecord();
  // }, []);

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <div className="flex min-h-screen pt-10 bg-dark ">
        <div className="z-40 sm:block">
          <Sidebar currentPage={currentPage} />
        </div>
        <div className="w-screen px-4 py-12 sm:px-6 md:px-8 lg:ps-14 lg:pe-44 xl:pe-60">
          <div className="flex flex-col w-full ">
            {/* 小漢堡 START */}
            <div className="flex border-b border-solid item-center menu-title ps-0">
              <BurgerMenu />
              <div className="flex flex-row items-end">
                <div className="text-2xl text-light ms-3 min-w-[100px]">
                  {currentPage}
                </div>
              </div>
            </div>
            {/* 小漢堡 END */}

            {/* Breadcrumbs START */}
            <div className="text-sm breadcrumbs ms-2">
              <Breadcrumbs currentPage={currentPage} />
            </div>
            {/* Breadcrumbs END */}

            {/* Toggle START */}
            <label className="relative grid px-4 mx-auto mt-4 border rounded-full cursor-pointer border-slate-700 bg-base-300 border-rounded place-items-center">
              <span
                className={` absolute left-[16px] h-[22px] w-[130px] rounded-full  bg-primary z-10 ${
                  gameRecordOpen
                    ? 'translate-x-[100%] duration-700 ease-in-out'
                    : ' duration-700 ease-in-out'
                }`}
              >
                {' '}
              </span>
              <span
                className={`${
                  gameRecordOpen ? 'text-light' : 'text-dark'
                } select-none delay-400 z-20 col-start-1 row-start-1  relative max-w-[145px] min-w-[130px] px-3 py-1 my-1 rounded-full text-center label-text `}
              >
                積分查詢
              </span>

              <input
                type="checkbox"
                id="toggle"
                checked={gameRecordOpen}
                onChange={handleToggleChange}
                className="hidden col-span-2 col-start-1 row-start-1 toggle bg-base-content"
              />
              <span
                className={`${
                  gameRecordOpen ? 'text-dark' : 'text-light'
                } select-none delay-400 z-20 col-start-2 row-start-1 max-w-[145px] min-w-[130px] px-3 py-1 my-1 rounded-full text-center label-text 
             `}
              >
                遊戲紀錄
              </span>
            </label>
            {/* Toggle END */}

            {/* SearchBar START */}
            <div className="flex justify-end mt-4 ps-8 item-center">
              <select
                value={pointSource}
                onChange={handlePointSource}
                className={`w-full max-w-[150px] min-w-[100px] border-slate-700 select select-bordered select-sm ${
                  gameRecordOpen ? 'hidden' : 'block '
                }`}
              >
                <option disabled value="選擇獲得來源">
                  選擇獲得來源
                </option>
                <option value="登入獲得">登入獲得</option>
                <option value="遊玩遊戲">遊玩遊戲</option>
              </select>
              <label className="flex items-center max-w-[150px] border-slate-700  w-full min-w-[150px] gap-1 ms-2 input input-bordered input-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="date"
                  className="grow input-sm"
                  placeholder="Search"
                />
              </label>
            </div>
            {/* SearchBar END */}

            {/* CONTENT1 START */}
            <div
              className={`mt-4 flex flex-col justify-between w-full  h-[580px] ${
                gameRecordOpen ? 'hidden' : 'block '
              } lg:mx-1 xl:mx-1 bg-base-300 rounded-box place-items-center`}
            >
              <table className="container table py-4 ">
                <thead className="w-full ">
                  <tr className="border-b border-slate-500 min-h-[52px]">
                    <th
                      onClick={handleDateSort}
                      className="text-lg text-center cursor-pointer text-light"
                    >
                      日期
                      <span className="relative ">
                        <MdArrowDropUp
                          className={`absolute top-[-2px] right-[-20px] ${
                            dateSortToggle ? 'text-slate-600' : ''
                          } `}
                        />
                        <MdArrowDropDown
                          className={`absolute top-[7px] right-[-20px] ${
                            dateSortToggle ? '' : 'text-slate-600'
                          }`}
                        />
                      </span>
                    </th>
                    <th className="text-lg text-center text-light ">
                      紅利積分
                    </th>
                    <th className="text-lg text-center text-light ">
                      獲得來源
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recordListPoint.rows &&
                    recordListPoint.rows.map((v, i) => {
                      return (
                        <tr
                          key={i}
                          className=" text-slate-400 hover:text-primary"
                        >
                          <td className="text-base text-center ">
                            {v.created_at}
                          </td>
                          <td className="text-base text-center ">
                            {v.points_increase}
                          </td>
                          <td className="text-base text-center ">{v.reason}</td>
                        </tr>
                      );
                    })}
                  {/* {Array(0)
                    .fill(1)
                    .map((v, i) => {
                      return (
                        <tr
                          key={i}
                          className=" text-slate-400 hover:text-primary"
                        >
                          <td className="text-base text-center ">2024/02/20</td>
                          <td className="text-base text-center ">10</td>
                          <td className="text-base text-center ">登入獲得</td>
                        </tr>
                      );
                    })} */}
                </tbody>
              </table>
              <div className="mb-3 join ">
                <button
                  className={`
                      ${Number(router.query.page) > 1 ? ' ' : 'btn-disabled'}
                      join-item btn border-slate-700 hover:bg-primary btn-xs`}
                  onClick={handlePrevPage}
                >
                  «
                </button>

                {[...Array(5)].map((v, i) => {
                  const p = recordListPoint.page - 1 + i;

                  if (p < 1 || p > recordListPoint.totalPages) return null;

                  return (
                    <Link
                      scroll={false}
                      key={p}
                      className={`${
                        p === recordListPoint.page ? 'text-neongreen ' : ''
                      } join-item btn border-slate-700 hover:bg-primary hover:text-dark btn-xs`}
                      href={`/account/record/${router.query.sid}?page=${p}`}
                    >
                      {p}
                    </Link>
                  );
                })}

                <button
                  className={`
                      ${
                        router.query.page ===
                        recordListPoint.totalPages.toString()
                          ? ' btn-disabled'
                          : ''
                      }
                      join-item btn border-slate-700 hover:bg-primary btn-xs`}
                  onClick={handleNextPage}
                >
                  »
                </button>
                {/* <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  «
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  1
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  2
                </button>
                <button className="join-item btn btn-outline hover:bg-primary btn-xs btn-disabled">
                  ...
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  99
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  100
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  »
                </button> */}
              </div>
            </div>
            {/* CONTENT1 END */}

            {/* CONTENT2 START */}
            <div
              className={`mt-4 flex flex-col justify-between w-full h-[580px] ${
                gameRecordOpen ? 'block ' : 'hidden '
              } lg:mx-1 xl:mx-1 bg-base-300 rounded-box place-items-center `}
            >
              <table className="container table py-4">
                <thead className="w-full ">
                  <tr className="border-b border-slate-500 min-h-[52px]">
                    <th className="text-lg text-center text-light">日期</th>
                    <th className="text-lg text-center text-light">得分</th>
                    <th className="text-lg text-center text-light">時間</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(10)
                    .fill(1)
                    .map((v, i) => {
                      return (
                        <tr
                          key={i}
                          className=" text-slate-400 hover:text-primary"
                        >
                          <td className="text-base text-center">2024/02/20</td>
                          <td className="text-base text-center">00011</td>
                          <td className="text-base text-center">01:55</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="mb-3 join ">
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  «
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  1
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  2
                </button>
                <button className="join-item btn btn-outline hover:bg-primary btn-xs btn-disabled">
                  ...
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  99
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  100
                </button>
                <button className="join-item btn border-slate-700 hover:bg-primary btn-xs">
                  »
                </button>
              </div>
            </div>
            {/* CONTENT2 END */}
          </div>
        </div>
      </div>
    </>
  );
}
