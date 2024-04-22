import Footer from '@/components/ui/footer/footer';
import Navbar from '@/components/ui/navbar/navbar';
import '@/styles/globals.css';
import { PostProvider } from '@/context/post-context';
import { AuthContextProvider } from '@/context/auth-context';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <PostProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </PostProvider>
      </AuthContextProvider>
    </>
  );
}
