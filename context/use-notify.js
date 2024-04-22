import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

// 1. 建立context
const NotifyContext = createContext(null);

// 2. 建立一個Context Provider元件
export function NotifyProvider({ children }) {
  const notify = (msg) =>
    toast(msg, {
      duration: 1500,
    });

  const notifySuccess = (msg) =>
    toast.success(msg, {
      duration: 1500,
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      duration: 1500,
    });

  const notifyLoading = (msg) =>
    toast.loading(msg, {
      duration: 1500,
    });

  const notifyPromise = (promise, options) => {
    return toast.promise(promise(), options);
  };

  return (
    <NotifyContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{
        notify,
        notifySuccess,
        notifyError,
        notifyPromise,
        notifyLoading,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
}

// 3. 提供一個包裝好useContext名稱，給消費者(Consumer)方便地直接呼叫使用
export const useNotify = () => useContext(NotifyContext);
