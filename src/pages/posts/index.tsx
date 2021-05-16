import { Button, Divider } from 'antd';
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
const Cookies = require('cookies');
interface Props {}

const posts = () => {
  // const [modalPostContent, setModalPostContent] = useState<JSX.Element>();
  // const [userToken, setUserToken] = useRecoilState(userLoginState);
  // setUserToken(true);
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  // const handleAdd = () => {
  //   console.log('test');
  //   setModalPostContent(<Link href='/'></Link>);
  // };

  return (
    <>
      <div>
        <Head>
          <title>Daytech Stagram</title>
        </Head>
      </div>
      <div className='pt-5'>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
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
          <CardPost />
          <CardPost />
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
