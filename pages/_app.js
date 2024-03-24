import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import '@/styles/globals.css';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [currentPageTitle, setCurrentPageTitle] = useState('');
  const handlePageChange = (pageTitle) => {
    setCurrentPageTitle(pageTitle);
  };
  return (
    <>
      <Navbar currentPageTitle={currentPageTitle} />
      <Component {...pageProps} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}
