import Footer from '@/components/ui/footer/footer';
import Navbar from '@/components/ui/navbar/navbar';
import '@/styles/globals.css';
import { PostProvider } from '@/context/post-context';

export default function App({ Component, pageProps }) {
  return (
    <>
      <PostProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PostProvider>
    </>
  );
}
