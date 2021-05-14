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
        <Button
          type='dashed'
          style={{ float: 'right' }}
          onClick={() => setModalActivePost(true)}
        >
          New Post
        </Button>
      </div>
      <FormPost />
    </div>
  );
};

export default create;

