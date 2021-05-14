import React from 'react';
import { Form, Input, Button, Image, Typography, Card } from 'antd';
import FormComment from '@/components/forms/FormComment';
const { Meta } = Card;
interface Props {}

const CardPost = (props: Props) => {
  return (
    <>
      <div>
        <Card
          hoverable
          style={{ width: 500 }}
          className='m-5'
          cover={
            <img
              alt='example'
              src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            />
          }
        >
          <Meta className='pb-3' title='Europe Street beat' description='www.instagram.com' />
          <FormComment />
        </Card>
      </div>
    </>
  );
};

export default CardPost;
