import '../app/globals.css';
import type { AppProps } from 'next/app';
import { MyAuthProvider as AuthProvider } from '../../contexts/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
