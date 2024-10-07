import Head from 'next/head';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { MyAuthProvider as AuthProvider } from '../../contexts/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <link rel="icon" href="/moon.ico" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
