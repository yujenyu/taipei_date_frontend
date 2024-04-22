import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { IoHeartCircleSharp, IoHeartCircleOutline } from 'react-icons/io5';
import Link from 'next/link';

export default function TripCalendar() {
  // Mock data for events
  const mockEvents = [
    { day: 1, content: 'Happy Date 1' },
    { day: 8, content: '鄂圖曼土耳其帝國' },
    { day: 5, content: '我的行程' },
    { day: 12, content: null },
    { day: 20, content: '我愛看電影' },
    { day: 22, content: '炫風衝鋒龍捲風' },
    { day: 23, content: 'event 5' },
  ];

  // 以 useState 控制 modal 的開關
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 開啟modal
  const openModal = () => setIsModalOpen(true);

  // 關閉modal
  const closeModal = () => setIsModalOpen(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalDate, setModalDate] = useState('');

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    const previousMonthDays = Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthTotalDays - firstDay + i + 1,
      isCurrentMonth: false,
    }));

    const thisMonthDays = Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      const event = mockEvents.find((event) => event.day === day);
      return {
        day,
        isCurrentMonth: true,
        content: event ? event.content : null,
      };
    });

    const totalCells = 42;
    const filledCells = previousMonthDays.length + thisMonthDays.length;
    const cellsToAdd = totalCells - filledCells;
    const nextMonthDays = Array.from({ length: cellsToAdd }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
    }));

    const allDays = [...previousMonthDays, ...thisMonthDays, ...nextMonthDays];

    return _.chunk(allDays, 7).map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((cell, dayIndex) => (
          <td
            key={dayIndex}
            style={{ verticalAlign: 'top' }}
            className={`text-sm sm:text:base h-12 sm:w-48 sm:h-20 text-center border border-white ${
              cell.isCurrentMonth
                ? 'text-white bg-black cursor-pointer'
                : 'text-gray-500 bg-black'
            }`}
            onClick={() => {
              if (cell.isCurrentMonth && !cell.content) {
                //只有當前月份 "且" 不包含行程的td可以透過點擊觸發彈跳視窗
                handleDayClick(cell.day);
              }
            }}
          >
            {cell.day}
            {cell.content && (
              <div className="sm:mt-3 flex justify-center items-center">
                <Link href="/trip/my-tripdetail" legacyBehavior>
                  <a className="hidden sm:inline-block text-sm bg-black px-2 py-1 border border-white rounded-full hover:bg-[#a0ff1f] hover:text-black hover:border-black">
                    {cell.content}
                  </a>
                </Link>
                <Link href="/trip/my-tripdetail" legacyBehavior>
                  <a className="block sm:hidden text-white text-lg ">
                    <IoHeartCircleOutline className=" text-[#ff03ff] hover:text-[#a0ff1f]" />
                  </a>
                </Link>
              </div>
            )}
          </td>
        ))}
      </tr>
    ));
  };

  const handleDayClick = (day) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(selected);

    // 取得td的日期
    const year = selected.getFullYear();
    const month = selected.getMonth() + 1; // getMonth() 返回的月份是從0開始的
    const dayOfMonth = selected.getDate();
    const formattedDate = `${year}-${month
      .toString()
      .padStart(2, '0')}-${dayOfMonth.toString().padStart(2, '0')}`; //padStart(2, '0')可以確保月份是二位數

    setModalDate(formattedDate); // 更新彈跳窗口內的日期

    setIsModalOpen(true); // Open the modal dialog
  };

  return (
    <>
      <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center bg-black mb-5">
        <div className="flex justify-center items-center gap-12 mb-2 mt-2">
          <button
            className="text-3xl hover:text-[#a0ff1f]"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
              )
            }
          >
            <FaArrowAltCircleLeft />
          </button>
          <p className="text-2xl">
            {`${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`}
          </p>
          <button
            className="text-3xl hover:text-[#a0ff1f]"
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
              )
            }
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              {weekDays.map((day, i) => (
                <th
                  key={i}
                  className="w-12 sm:w-48 sm:h-8 text-center text-black bg-white first:rounded-tl-lg last:rounded-tr-lg"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendarDays()}</tbody>
        </table>
      </div>
      {isModalOpen && (
        <dialog open id="my_modal_1" className="modal">
          <form action="./add-trip" method="post">
            <div className="modal-box w-96">
              <h3 className="font-bold text-lg mb-4 text-white">建立行程</h3>
              <p className="text-white">行程日期</p>
              <input
                type="date"
                className="mt-4 mb-4 px-2 py-1 w-full"
                value={modalDate}
                disabled
              />
              <p className="text-white">行程名稱</p>
              <input
                type="text"
                className="mt-4 mb-4 px-2 py-1 w-full"
                placeholder="請輸入行程名稱"
              />
              <div className="modal-action">
                {/* 更新按鈕的onClick處理函式，以關閉彈出視窗 */}
                <button type="button" className="btn" onClick={closeModal}>
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
    </>
  );
}
