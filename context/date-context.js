import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

// 1. 建立context
const DateContext = createContext(null);

// 2. 建立一個Context Provider元件
export function DateProvider({ children }) {
  const [toggleBar, setToggleBar] = useState({
    id: 0,
    name: '請選擇一種喜愛的酒吧類型',
  });
  const [toggleMovie, setToggleMovie] = useState({
    id: 0,
    name: '請選擇一種喜愛的電影類型',
  });
  return (
    <DateContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{ toggleBar, setToggleBar, toggleMovie, setToggleMovie }}
    >
      {children}
    </DateContext.Provider>
  );
}

// 3. 提供一個包裝好useContext名稱，給消費者(Consumer)方便地直接呼叫使用
export const useDate = () => useContext(DateContext);
