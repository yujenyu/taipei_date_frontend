import Footer from '@/components/ui/footer/footer';
import Navbar from '@/components/ui/navbar/navbar';
import '@/styles/globals.css';
import { useState } from 'react';
import { AuthContextProvider } from '@/context/auth-context';
import { NotifyProvider } from '@/context/use-notify';
import { Toaster } from 'react-hot-toast';
import { DateProvider } from '@/context/date-context';
import { LoaderProvider } from '@/context/use-loader';
import { PostProvider } from '@/context/post-context';

import LoginModal from '@/components/ui/login-modal/login-modal';
export default function App({ Component, pageProps }) {
  const [currentPageTitle, setCurrentPageTitle] = useState('');
  const handlePageChange = (pageTitle) => {
    setCurrentPageTitle(pageTitle);
  };
  return (
    <>
      <AuthContextProvider>
        <LoaderProvider>
          <NotifyProvider>
            <DateProvider>
              <PostProvider>
                <Toaster />
                <Navbar currentPageTitle={currentPageTitle} />
                <LoginModal />
                <Component {...pageProps} onPageChange={handlePageChange} />
                <Footer />
              </PostProvider>
            </DateProvider>
          </NotifyProvider>
        </LoaderProvider>
      </AuthContextProvider>
    </>
  );
}
