import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Home from '../index';
import { useRecoilState } from 'recoil';
import {
  createPostState,
  postsState,
  userLoginState,
} from '@/components/recoil/atom';
import CardPost from '@/components/cards/CardPost';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Axios } from '../api/daytechbackend';
import { useRouter } from 'next/router';
import getCookies from '../../lib/utils/cookies';
import decryptToken from '../../lib/utils/decryptToken';

interface postsProps {
  decryptJwt: { username: string; iat: number; exp: number };
  jwt: string;
  feeds: any;
}

const posts: React.FC<postsProps> = ({ decryptJwt, jwt, feeds }) => {
  const router = useRouter();
  const [posts, setPosts] = useRecoilState(postsState);
  useEffect(() => {
    setPosts(feeds);
    setUserToken(true);
  }, [feeds]);

  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const [userToken, setUserToken] = useRecoilState(userLoginState);

  const onPostDelete = async (id: number) => {
    try {
      const deleteData = await Axios.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const temp: any = posts.filter((post: any) => post.id !== id);
      setPosts(temp);
      message.success('Successfully delete a post');

      // set posts
    } catch (error) {
      message.error('Unable to delete a post');
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
          <CardPost
            posts={posts}
            onPostDelete={onPostDelete}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //ทำงานก่อน
  // Create a cookies instance

  const reqCookie: string | undefined = req.headers.cookie;
  const jwt: string = await getCookies('jwt', reqCookie);
  const decryptJwt: string | object = await decryptToken(jwt);
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
      decryptJwt,
      jwt,
      feeds: data,
    },
  };
};

export default posts;
