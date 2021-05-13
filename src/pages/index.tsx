import {
  Button,
  DatePicker,
  Typography,
  version,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';

import Head from 'next/head';
import PostList from '@/components/posts/PostList';
import { useRecoilState } from 'recoil';
import { createPostState } from '@/components/recoil/atom';


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Daytech Stagram</title>
        </Head>
      </div>
   
    </>
  );
}
