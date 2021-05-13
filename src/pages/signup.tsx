import React from 'react';
import Head from 'next/head';
import SignForm from '@/components/users/SignForm';
import Home from './index';

const signup = () => {
  return (
    <div>
      <Home />
      <SignForm pageType={'signup'} />
    </div>
  );
};

export default signup;
