import {
  Button,
  DatePicker,
  Typography,
  version,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { editPostState, userLoginState } from '@/components/recoil/atom';
import FormEditPost from '@/components/forms/FormEditPost';

interface Props {}

const desc = () => {
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);
  const [userToken, setUserToken] = useRecoilState(userLoginState);
  useEffect(() => {
    setUserToken(true);
  }, []);
  return (
    <div>
      <Head>
        <title>Daytech Stagram</title>
      </Head>
      <div className='pt-5'>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
          <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
            <Button
              onClick={() => {
                setModalActiveEditPost(true);
              }}
              type='dashed'
            >
              New Post
            </Button>
          </div>
        </div>
      </div>
      {/* <FormEditPost /> */}
    </div>
  );
};

export default desc;
