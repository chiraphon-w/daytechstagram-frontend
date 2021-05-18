import { message } from 'antd';
import React from 'react';
import FormLogin from '@/components/forms/FormLogin';
import Home from './index';
import { GetServerSideProps } from 'next';
import getCookies from 'src/lib/utils/cookies';

const signup = () => {
  return (
    <div>
      <Home />
      <FormLogin pageType={'signup'} />
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
    message.warning('You are already signin');
    res.writeHead(302, { Location: '/posts' }); //302 is a just code to redirect
    res.end();
  }


  return {
    props: {
      status: true
    },
  };
};

export default signup;
