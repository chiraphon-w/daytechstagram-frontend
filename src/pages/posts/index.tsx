import { Button, message } from 'antd';
import React, { useState } from 'react';
import Head from 'next/head';
import Home from '../index';
import { useRecoilState } from 'recoil';
import { createPostState, userLoginState } from '@/components/recoil/atom';
import CardPost from '@/components/cards/CardPost';
import FormPost from '@/components/forms/FormPost';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
// import Cookies from 'cookies';
import { Axios } from '../api/daytechbackend';
import { Post } from '@/components/types';
import { useRouter } from 'next/router';
const Cookies = require('cookies');

interface postsProps {
  jwt: string;
  feeds: Post[];
}

const posts: React.FC<postsProps> = ({ jwt, feeds }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>(feeds);
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);

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
    <>
      <div>
        <Head>
          <title>Daytech Stagram</title>
        </Head>
      </div>
      <div className='pt-5'>
        <div className='w-full max-w-4xl mx-auto p-5 desc-center'>
          <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
            <Button
              type='dashed'
              onClick={() => {
                setModalActivePost(true);
              }}
            >
              <Link shallow={true} href='/posts/create'>
                New Post
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap justify-center'>
        <div className='flex-row'>
          {/* <CardPost onMessagePost={onMessagePost}/> */}
          <CardPost posts={posts} />
        </div>
      </div>
    </>
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

export default posts;
