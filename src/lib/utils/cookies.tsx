import React from 'react';

interface Props {}

const getCookies = (name: any, cookie: any) => {
  // export const getCookie = (name, cookie) => {
  const value: any = `; ${cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  //   };
};

export default getCookies;
