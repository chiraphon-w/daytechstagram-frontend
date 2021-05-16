import {
  Button,
  message
} from 'antd';
import React, { useState } from 'react';
import Head from 'next/head';
import FormPost from '@/components/forms/FormPost';
import Home from '../index';
import { useRecoilState } from 'recoil';
import { createPostState } from '@/components/recoil/atom';
import { Axios } from '../api/daytechbackend';
import { Post } from '@/components/types';
import { GetServerSideProps } from 'next';
const Cookies = require('cookies');

interface createProps {
  jwt: string;
  feeds: Post[];
}

const create:React.FC<createProps> = ({ jwt, feeds }) => {
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const [posts, setPosts] = useState<Post[]>(feeds);
  const onMessagePost = async (desc: string) => {
    try {
      // create a post
      const formdatas = new FormData();
      formdatas.append('desc', desc);
      await Axios.post('/posts', formdatas, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Successfully create a post');

      // get posts
      const { data } = await Axios.get('/posts', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // set posts
      setPosts(data);
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
      <FormPost />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Create a cookies instance
  const cookies = new Cookies(req, res);
  const jwt = cookies.get('jwt');

  // if not found cookie, just redirect to sign in page
  if (!jwt) {
    res.writeHead(302, { Location: '/signin' }); //302 is a just code to redirect
    res.end();
  }

  const { data } = await Axios.get('/posts', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    props: {
      jwt,
      feeds: data,
    },
  };
};

export default create;
