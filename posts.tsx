import {
  Button,
  Divider
} from 'antd';
import React, { useState } from 'react';
import Head from 'next/head';
// import Home from './index';
import { useRecoilState } from 'recoil';
import { createPostState } from '@/components/recoil/atom';
import CardPost from '@/components/cards/CardPost';
import FormPost from '@/components/forms/FormPost';
import Link from 'next/link';
const posts = () => {
  const [modalPostContent, setModalPostContent] = useState<JSX.Element>();
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const handleAdd = () => {
    console.log('test');
    setModalPostContent(<Link href='/'></Link>);
  };
  return (
    <div>
      <div className='pt-5'>
        <Button
          type='primary'
          shape='circle'
          style={{ float: 'right' }}
          onClick={() => {
            setModalActivePost(true);
          }}
        >
          <Link href='/posts/create'>+</Link>
        </Button>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
          <h1 className='text-lg font-bold text-gray-400'> <Divider>Posts</Divider></h1>
          <div className='flex p-5 justify-center'>
            <CardPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default posts;
