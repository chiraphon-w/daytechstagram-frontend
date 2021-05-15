import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import Head from 'next/head';
import Home from '../index';
import { useRecoilState } from 'recoil';
import { createPostState } from '@/components/recoil/atom';
import CardPost from '@/components/cards/CardPost';
import FormPost from '@/components/forms/FormPost';
import Link from 'next/link';

interface Props {}

const posts = () => {
  // const [modalPostContent, setModalPostContent] = useState<JSX.Element>();
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
export default posts;
