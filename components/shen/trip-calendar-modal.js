import React, { useState } from 'react';
import _ from 'lodash';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

export default function TripCalendarModal() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const [selectedDate, setSelectedDate] = useState(null);

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

    const thisMonthDays = Array.from({ length: totalDays }, (_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
    }));

    // 確保有42格子（7x6）
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
            className={`h-12 w-12 sm:w-48 sm:h-20 text-sm sm:text-base text-center border border-white ${
              cell.isCurrentMonth
                ? 'text-white bg-black cursor-pointer'
                : 'text-gray-500 bg-black'
            }`}
            onClick={() => cell.isCurrentMonth && handleDayClick(cell.day)}
          >
            {cell.day}
          </td>
        ))}
      </tr>
    ));
  };

  const handleDayClick = (day) => {
    if (day) {
      const selected = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(selected);
    }
  };

  return (
    <>
      <div
        id="calendarGroup"
        className="min-h-[calc(100vh-200px)] flex flex-col justify-center items-center  mb-5"
      >
        <div className="flex justify-center items-center gap-12 mb-4 mt-2">
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
          <p className="text-2xl">{`${currentDate.getFullYear()}/${
            currentDate.getMonth() + 1
          }`}</p>
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
                  className="w-8 sm:w-16 sm:h-8 text-center text-black bg-white first:rounded-tl-lg last:rounded-tr-lg"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderCalendarDays()}</tbody>
        </table>
      </div>
    </>
  );
}
