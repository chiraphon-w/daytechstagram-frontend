import { Button, message } from 'antd';
import React, { useState } from 'react';
import Head from 'next/head';
import FormPost from '@/components/forms/FormPost';
import Home from '../index';
import { useRecoilState } from 'recoil';
import { createPostState, postsState } from '@/components/recoil/atom';
import { Axios } from '../api/daytechbackend';
import { Post } from '@/components/types';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import getCookies from '../../lib/utils/cookies';

interface createProps {
  jwt: any;
  // feeds: Post[];
}

const create: React.FC<createProps> = ({}) => {
  const jwt = Cookies.get('jwt');
  console.log('jwt', jwt);

  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const [posts, setPosts] = useRecoilState(postsState);

  const onMessagePost = async (desc: string, file: any) => {
    try {
      // create a post
      console.log('file', file);
      const formdatas = new FormData();
      formdatas.append('desc', desc);
      formdatas.append('image', file);

      const newData = await Axios.post('/posts', formdatas, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Successfully create a post');

      console.log('newData', newData.data);
    } catch (error) {
      message.error('Unable to create post');
    }
  };

  return (
    <div>
      <Home />
      <div className='pt-5'>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
          <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
            <Button
              onClick={() => {
                setModalActivePost(true);
              }}
              type='dashed'
            >
              New Post
            </Button>
          </div>
        </div>
      </div>
      <FormPost onMessagePost={onMessagePost} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // console.log('req', req.headers.cookie);
  const reqCookie: any = req.headers.cookie;
  const jwt: any = await getCookies('jwt', reqCookie);

  if (!jwt) {
    res.writeHead(302, { Location: '/signin' }); //302 is a just code to redirect
    res.end();
  }


  return {
    props: {
      status: true,
    },
  };
};

export default create;
