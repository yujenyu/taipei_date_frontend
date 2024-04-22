import { useState, useEffect } from 'react';
import Sidebar from '@/components/account-center/sidebar/sidebar';
import PageTitle from '@/components/page-title';
import Breadcrumbs from '@/components/account-center/breadcrumbs/breadcrumbs';
import BurgerMenu from '@/components/account-center/burgermenu/burger-menu';

export default function AccountCollect({ onPageChange }) {
  const pageTitle = '會員中心';
  const currentPage = '個人收藏';
  useEffect(() => {
    onPageChange(pageTitle);
  }, []);
  const [radio, setRadio] = useState('option1');
  const handleOptionChange = (e) => {
    setRadio(e.target.value);
  };

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

            {/* Breadcrumbs START */}
            <div className="text-sm breadcrumbs ms-2">
              <Breadcrumbs currentPage={currentPage} />
            </div>
            {/* Breadcrumbs END */}

            {/* TabBar START */}
            <div>
              <div
                role="tablist"
                className="grid-cols-3 mt-4 tabs tabs-bordered"
              >
                {/* SearchBar START */}
                <div className="flex justify-end item-center">
                  <label className="flex items-center max-w-[170px] border-slate-700 w-full min-w-[150px] gap-1 ms-2 input input-bordered input-sm">
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
                      className="grow input-sm p-s0"
                      placeholder="Search"
                    />
                  </label>
                </div>
                {/* SearchBar END */}

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  aria-label="貼文"
                  value="option1"
                  checked={radio === 'option1'}
                  onChange={handleOptionChange}
                />
                {/* CONTENT1 START */}
                <div role="tabpanel" className="mt-2 tab-content">
                  <div
                    className={`mt-4 flex flex-col justify-between w-full lg:mx-1 xl:mx-1 rounded-box  place-items-center `}
                  >
                    <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-2 gap-2 auto-rows-min md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                      {/* Card START */}
                      {Array(5)
                        .fill(1)
                        .map((v, i) => {
                          return (
                            <div
                              key={i}
                              className="mb-0 border border-white shadow-xl card w-fit bg-base-100 h-[400px] glass"
                            >
                              <figure>
                                <img
                                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                  alt="Shoes"
                                />
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title">Shoes!</h2>
                                <p>
                                  If a dog chews shoes whose shoes does he
                                  choose?
                                </p>
                                <div className="justify-end card-actions">
                                  <button className="btn btn-primary">
                                    Buy Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {/* Card END */}
                    </div>

                    {/* Pagination START */}
                    <div className="my-4 join ">
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
                    {/* Pagination START */}
                  </div>
                </div>
                {/* CONTENT1 END */}

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  value="option2"
                  aria-label="酒吧"
                  checked={radio === 'option2'}
                  onChange={handleOptionChange}
                />

                {/* CONTENT1 START */}
                <div role="tabpanel" className="mt-2 tab-content">
                  <div
                    className={`mt-4 flex flex-col justify-between w-full lg:mx-1 xl:mx-1 rounded-box  place-items-center `}
                  >
                    {/* Card START */}
                    <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-2 gap-2 auto-rows-min md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                      {Array(5)
                        .fill(1)
                        .map((v, i) => {
                          return (
                            <div
                              key={i}
                              className="mb-0 border border-white shadow-xl card bg-base-100 h-[400px] glass"
                            >
                              <figure>
                                <img src="/bar.jpg" alt="Shoes" />
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title">酒吧</h2>
                                <p>這酒吧好讚</p>
                                <div className="justify-end card-actions">
                                  <button className="btn btn-primary">
                                    看更多
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* Card END */}

                    {/* Pagination START */}
                    <div className="my-4 join ">
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
                    {/* Pagination START */}
                  </div>
                </div>
                {/* CONTENT1 END */}

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  value="option3"
                  aria-label="電影"
                  checked={radio === 'option3'}
                  onChange={handleOptionChange}
                />

                {/* CONTENT1 START */}
                <div role="tabpanel" className="mt-2 tab-content">
                  <div
                    className={`mt-4 flex flex-col justify-between w-full lg:mx-1 xl:mx-1 rounded-box  place-items-center `}
                  >
                    {/* Card START */}
                    <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-2 gap-2 auto-rows-min md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                      {Array(7)
                        .fill(1)
                        .map((v, i) => {
                          return (
                            <div
                              key={i}
                              className="mb-0 border border-white shadow-xl card w-fit bg-base-100  h-[400px] glass"
                            >
                              <figure>
                                <img src="/movie.jpg" alt="Shoes" />
                              </figure>
                              <div className="card-body">
                                <h2 className="card-title">電影</h2>
                                <p>大螢幕94狂</p>
                                <div className="justify-end card-actions">
                                  <button className="btn btn-primary">
                                    看更多
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* Card END */}

                    {/* Pagination START */}
                    <div className="my-4 join ">
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
                    {/* Pagination START */}
                  </div>
                </div>
                {/* CONTENT1 END */}
              </div>
            </div>
            {/* TabBar END */}
          </div>
        </div>
      </div>
    </>
  );
}
