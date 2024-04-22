import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// 這裡貼上從firebase專案設定中，網頁應用程式整合的設定值
const firebaseConfig = {
  apiKey: 'AIzaSyCfa1Dw2BuYrWOIp0N2BVm739tTXo8LV2g',
  authDomain: 'taipei-date-auth.firebaseapp.com',
  projectId: 'taipei-date-auth',
  storageBucket: 'taipei-date-auth.appspot.com',
  messagingSenderId: '847875930005',
  appId: '1:847875930005:web:7e48af8370b926dbf8a89c',
};

export { firebaseConfig };

const app = initializeApp(firebaseConfig);

export const getAuthGoogle = getAuth();
