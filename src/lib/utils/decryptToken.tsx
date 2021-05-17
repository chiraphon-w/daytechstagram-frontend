import React from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

interface Props {}

const decryptToken = (token: string) => {
  //   const token: any = Cookies.get('jwt');

  return jwt.verify(token, 'daytech');
};

export default decryptToken;
