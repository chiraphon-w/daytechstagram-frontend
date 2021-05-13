import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';
import { RecoilRoot } from 'recoil';
import { AppProps } from 'next/dist/next-server/lib/router/router';

function MyApp({ Component, pageProps }: AppProps) {
  return <RecoilRoot><Component {...pageProps} /></RecoilRoot>
}

export default MyApp
