import React from 'react';
import Head from 'next/head';
import FormLogin from '@/components/forms/FormLogin';
import Home from './index';
import { GetServerSideProps } from 'next';
import getCookies from 'src/lib/utils/cookies';
import decryptToken from 'src/lib/utils/decryptToken';
import { Axios } from './api/daytechbackend';
const signin = () => {

  return (
    <div>
      <Home />
      <FormLogin pageType={'signin'} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //ทำงานก่อน
  // Create a cookies instance

  const reqCookie: string | undefined = req.headers.cookie;
  const jwt: string = await getCookies('jwt', reqCookie);
  // if not found cookie, just redirect to sign in page
  if (jwt) {
    res.writeHead(302, { Location: '/posts' }); //302 is a just code to redirect
    res.end();
  }


  return {
    props: {
      status: true
    },
  };
};

export default signin;
