import {
  Button,
  DatePicker,
  Typography,
  version,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';
import React from 'react';
import Head from 'next/head';
import FormPost from '@/components/forms/FormPost';
import Home from '../index';
import { useRecoilState } from 'recoil';
import { createPostState } from '@/components/recoil/atom';

const create = () => {
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);

  return (
    <div>
      <Home />
      <div className='pt-5'>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
          <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
            <Button type='dashed'>New Post</Button>
          </div>
        </div>
      </div>
      <FormPost />
    </div>
  );
};

export default create;
