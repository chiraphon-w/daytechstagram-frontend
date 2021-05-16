import React from 'react';
import Head from 'next/head';
import FormLogin from '@/components/forms/FormLogin';
import Home from './index';
import { useRouter } from 'next/router';
import { URLSearchParams } from 'url';
import axios from 'axios';
import { authAxios } from './api/daytechbackend';
import { useRecoilState } from 'recoil';
import { userLoginState, userLogoutState } from '@/components/recoil/atom';

const cookieCutter = require('cookie-cutter');

const signin = () => {

  return (
    <div>
      <Home />
      <FormLogin pageType={'signin'} />
    </div>
  );
};

export default signin;
