import React from 'react';
import FormLogin from '@/components/forms/FormLogin';
import Home from './index';

const signup = () => {
  return (
    <div>
      <Home />
      <FormLogin pageType={'signup'} />
    </div>
  );
};

export default signup;
