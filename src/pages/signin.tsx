import React from 'react';
import Head from 'next/head';
import SignForm from '@/components/users/SignForm';
import Home from './index';

const signin = () => {
  return (
    <div>
      <Home />
      <SignForm pageType={'signin'} />
    </div>
  );
};

export default signin;
