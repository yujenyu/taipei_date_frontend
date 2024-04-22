import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TripSidebar2({ tripName, trip_plan_id }) {
  console.log('TripSidebar2 received tripName:', tripName);
  const [trip, setTrip] = useState({}); //用於儲存從trip_plans中獲取的值
  const router = useRouter();
  const [tripDraft, setTripDraft] = useState(tripName.trip_draft);

  // 分別為取消分享和閱讀行程筆記的彈跳視窗設定 state
  const [isCancelShareModalOpen, setIsCancelShareModalOpen] = useState(false);
  const [isReadNoteModalOpen, setIsReadNoteModalOpen] = useState(false);
  // 分別為分享行程和新增行程筆記的彈跳視窗設定 state
  const [isShareTripModalOpen, setIsShareTripModalOpen] = useState(false);
  const [isNewTripNoteModalOpen, setIsNewTripNoteModalOpen] = useState(false);

  // 為彈跳視窗設定開啟和關閉函數（取消分享、閱讀筆記）
  const openCancelShareModal = () => {
    setIsCancelShareModalOpen(true);
  };
  const closeCancelShareModal = () => setIsCancelShareModalOpen(false);
  const openReadNoteModal = () => setIsReadNoteModalOpen(true);
  const closeReadNoteModal = () => setIsReadNoteModalOpen(false);
  // 為彈跳視窗設定開啟和關閉函數（分享、新增筆記）
  const openShareTripModal = () => {
    setIsShareTripModalOpen(true);
  };
  const closeShareTripModal = () => {
    setIsShareTripModalOpen(false);
  }; // 取消分享後的 draft 狀態為 0
  const openNewTripNoteModal = () => setIsNewTripNoteModalOpen(true);
  const closeNewTripNoteModal = () => setIsNewTripNoteModalOpen(false);

  const actionButton =
    tripName.trip_draft === 1 ? (
      <a
        onClick={openCancelShareModal}
        className="text-xs sm:text-base bg-[#ff03ff] px-2 py-1 text-white border border-white rounded-full mr-8 hover:bg-[#ff03ff] hover:text-black cursor-pointer"
      >
        取消分享
      </a>
    ) : (
      <a
        onClick={openShareTripModal}
        className="text-xs sm:text-base bg-black px-2 py-1 border border-white rounded-full mr-8 hover:bg-[#a0ff1f] hover:text-black hover:border-black cursor-pointer"
      >
        分享行程
      </a>
    );

  //trip_plans資料
  useEffect(() => {
    if (trip_plan_id) {
      const fetchTrip = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/trip/my-details/trip-plan/${trip_plan_id}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched Trip Name Data:', data);
          if (data) {
            setTrip(data);
            console.log('Setting tripName to:', data);
          }
        } catch (error) {
          console.error('Fetching trip details error:', error);
        }
      };
      fetchTrip();
    }
  }, [trip_plan_id]);

  const shareTrip = async () => {
    const url = `http://localhost:3001/trip/my-details/share/${trip_plan_id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shared: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share the trip.');
      }
      const result = await response.json();
      console.log('Trip shared successfully:', result);
      setTripDraft(1); // 更新 tripDraft 為 1，表示已分享
      closeShareTripModal(); // 關閉彈跳視窗
    } catch (error) {
      console.error('Error sharing the trip:', error);
    }
  };
  const UnShareTrip = async () => {
    const url = `http://localhost:3001/trip/my-details/unshare/${trip_plan_id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shared: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share the trip.');
      }
      const result = await response.json();
      console.log('Trip shared successfully:', result);
      setTripDraft(0); // 更新 tripDraft 為 1，表示已分享
      closeCancelShareModal(); // 關閉彈跳視窗
    } catch (error) {
      console.error('Error sharing the trip:', error);
    }
  };

  return (
    <div className=" sm:ml-20 sm:mr-20 pt-16 border-b-2 border-white pb-3 ">
      <div className="trip-sidebar2 hidden sm:block">
        <p className="text-4xl mb-2 ">行程規劃</p>
        <div className=" justify-between items-center pr-2.5 flex">
          <div className="grid grid-cols-2 sm:block ml-5 sm:ml-0 gap-2">
            <span className="text-xs sm:text-base mr-8 ">
              {tripName && tripName.trip_title
                ? tripName.trip_title
                : 'Loading...'}
            </span>

            <span className="text-xs sm:text-base mr-8 ">
              {tripName && tripName.trip_date
                ? new Date(tripName.trip_date).toLocaleDateString('en-CA') // 格式化日期為 YYYY-MM-DD
                : 'Loading...'}
            </span>

            {actionButton}

            {/* 以 useState 來控制<dialog> */}
            {isShareTripModalOpen && (
              <dialog open className="modal">
                <form action="#" method="post">
                  {/* 之後要跟後端路由連結 */}
                  <div className="modal-box w-96 flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg mb-4 text-[#a0ff1f] text-center">
                      確定要分享 {tripName.trip_title} 給其他使用者嗎？
                    </h3>
                    <div className="modal-action">
                      {/* 更新按鈕的onClick，以關閉彈出視窗 */}
                      <button
                        type="button"
                        className="btn"
                        onClick={closeShareTripModal}
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="btn ml-4"
                        onClick={() => {
                          shareTrip();
                        }}
                      >
                        確定
                      </button>
                    </div>
                  </div>
                </form>
              </dialog>
            )}
            {/* 以 useState 來控制<dialog> */}
            {isCancelShareModalOpen && (
              <dialog open className="modal">
                <form action="#" method="post">
                  {/* 之後要跟後端路由連結 */}
                  <div className="modal-box w-96 flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg mb-4 text-[#a0ff1f] text-center">
                      確定要取消分享 {tripName.trip_title} 嗎？
                    </h3>
                    <div className="modal-action">
                      {/* 更新按鈕的onClick，以關閉彈出視窗 */}
                      <button
                        type="button"
                        className="btn"
                        onClick={closeShareTripModal}
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        className="btn ml-4"
                        onClick={() => {
                          UnShareTrip();
                        }}
                      >
                        確定
                      </button>
                    </div>
                  </div>
                </form>
              </dialog>
            )}
            <a
              className=" text-xs sm:text-base bg-black px-2 py-1 border border-white rounded-full hover:bg-[#a0ff1f] hover:text-black hover:border-black cursor-pointer"
              onClick={openNewTripNoteModal}
            >
              新增行程筆記
            </a>

            {/* 以 useState 來控制<dialog> */}
            {isNewTripNoteModalOpen && (
              <dialog open className="modal">
                <form action="#" method="post">
                  {/* 之後要跟後端路由連結 */}
                  <div className="modal-box w-96 ">
                    <h3 className="font-bold text-lg mb-4 text-white ">
                      行程筆記
                    </h3>
                    <p className="text-white">行程描述</p>
                    <input
                      type="text"
                      className="mt-4 mb-4 px-2 py-1 w-full"
                      placeholder="請輸入您的行程描述"
                    />
                    <p className="text-white">行程筆記</p>
                    <textarea
                      className="mt-4 mb-4 px-2 py-1 w-full h-32"
                      value="請輸入您的行程筆記"
                    />
                    <div className="modal-action">
                      {/* 更新按鈕的onClick處理函式，以關閉彈出視窗 */}
                      <button
                        type="button"
                        className="btn"
                        onClick={closeNewTripNoteModal}
                      >
                        取消
                      </button>
                      <button type="submit" className="btn ml-4">
                        完成
                      </button>
                    </div>
                  </div>
                </form>
              </dialog>
            )}
          </div>
          <div className=" ">
            <Link
              href="/trip/my-trip"
              className="text-xs sm:text-base hover:text-[#a0ff1f]"
            >
              回到我的行程
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-5 flex flex-col justify-start items-start gap-2.5 sm:hidden">
        <div className="flex flex-col justify-start items-start gap-2.5">
          <div className="text-white text-base font-normal">
            {tripName && tripName.trip_title
              ? tripName.trip_title
              : 'Loading...'}
          </div>
          <div className="text-white text-base font-normal">
            {tripName && tripName.trip_date
              ? new Date(tripName.trip_date).toLocaleDateString('en-CA') // 格式化日期為 YYYY-MM-DD
              : 'Loading...'}
          </div>
        </div>
        <div className="flex justify-start items-start gap-2">
          {actionButton}

          {/* 以 useState 來控制<dialog> */}
          {isShareTripModalOpen && (
            <dialog open className="modal">
              <form action="#" method="post">
                {/* 之後要跟後端路由連結 */}
                <div className="modal-box w-96 flex flex-col justify-center items-center">
                  <h3 className="font-bold text-lg mb-4 text-[#a0ff1f] text-center">
                    確定要分享 {tripName.trip_title} 給其他使用者嗎？
                  </h3>
                  <div className="modal-action">
                    {/* 更新按鈕的onClick，以關閉彈出視窗 */}
                    <button
                      type="button"
                      className="btn"
                      onClick={closeShareTripModal}
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="btn ml-4"
                      onClick={() => {
                        shareTrip();
                      }}
                    >
                      確定
                    </button>
                  </div>
                </div>
              </form>
            </dialog>
          )}
          {/* 以 useState 來控制<dialog> */}
          {isCancelShareModalOpen && (
            <dialog open className="modal">
              <form action="#" method="post">
                {/* 之後要跟後端路由連結 */}
                <div className="modal-box w-96 flex flex-col justify-center items-center">
                  <h3 className="font-bold text-lg mb-4 text-[#a0ff1f] text-center">
                    確定要取消分享 {tripName.trip_title} 嗎？
                  </h3>
                  <div className="modal-action">
                    {/* 更新按鈕的onClick，以關閉彈出視窗 */}
                    <button
                      type="button"
                      className="btn"
                      onClick={closeShareTripModal}
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="btn ml-4"
                      onClick={() => {
                        UnShareTrip();
                      }}
                    >
                      確定
                    </button>
                  </div>
                </div>
              </form>
            </dialog>
          )}
          <h5
            className=" text-xs sm:text-base bg-black px-2 py-1 border border-white rounded-full hover:bg-[#a0ff1f] hover:text-black hover:border-black"
            onClick={openNewTripNoteModal}
          >
            新增行程筆記
          </h5>
          {/* 以 useState 來控制<dialog> */}
          {isNewTripNoteModalOpen && (
            <dialog open className="modal">
              <form action="#" method="post">
                {/* 之後要跟後端路由連結 */}
                <div className="modal-box w-96 ">
                  <h3 className="font-bold text-lg mb-4 text-white ">
                    行程筆記
                  </h3>
                  <p className="text-white">行程描述</p>
                  <input
                    type="text"
                    className="mt-4 mb-4 px-2 py-1 w-full"
                    placeholder="請輸入您的行程描述"
                  />
                  <p className="text-white">行程筆記</p>
                  <textarea
                    className="mt-4 mb-4 px-2 py-1 w-full h-32"
                    value="請輸入您的行程筆記"
                  />
                  <div className="modal-action">
                    {/* 更新按鈕的onClick處理函式，以關閉彈出視窗 */}
                    <button
                      type="button"
                      className="btn"
                      onClick={closeNewTripNoteModal}
                    >
                      取消
                    </button>
                    <button type="submit" className="btn ml-4">
                      完成
                    </button>
                  </div>
                </div>
              </form>
            </dialog>
          )}
        </div>
        <div className="flex self-stretch justify-end items-center">
          <Link
            href="/trip/my-trip"
            className="text-xs sm:text-base hover:text-[#a0ff1f]"
          >
            回到我的行程
          </Link>
        </div>
      </div>
    </div>
  );
}
