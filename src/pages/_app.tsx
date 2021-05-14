import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';

import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import MainLayout from '@/components/layouts/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='min-h-screen flex'>
    <MainLayout>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </MainLayout>
  </div>
  );
}

export default MyApp;