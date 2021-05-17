import React from 'react';
import Head from 'next/head';
import FormLogin from '@/components/forms/FormLogin';
import Home from './index';
const signin = () => {

  return (
    <div>
      <Home />
      <FormLogin pageType={'signin'} />
    </div>
  );
};

export default signin;
