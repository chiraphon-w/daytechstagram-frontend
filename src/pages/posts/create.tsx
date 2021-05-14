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
import CreatePostForm from '@/components/posts/CreatePostForm';
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
          type='primary'
          shape='circle'
          style={{ float: 'right' }}
          onClick={() => setModalActivePost(true)}
        >
          +
        </Button>
      </div>
      <CreatePostForm />
    </div>
  );
};

export default create;
