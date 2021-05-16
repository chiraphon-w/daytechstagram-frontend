import React from 'react';
import Head from 'next/head';
import FormLogin from '@/components/forms/FormLogin';
import Home from './index';
import { useRecoilState } from 'recoil';
import { errorState } from '@/components/recoil/atom';

const signup = () => {
  const [errorCode, setErrorCode] = useRecoilState(errorState);
  // setErrorCode(0);
  return (
    <div>
      <Home />
      <FormLogin pageType={'signup'} />
    </div>
  );
};

export default signup;
