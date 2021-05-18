import React from 'react';
import jwt from 'jsonwebtoken';


const decryptToken = (token: string) => {
  return jwt.verify(token, 'daytech');
};

export default decryptToken;
