import React from 'react';
import { Form, Input, Button, Image, Typography, Card } from 'antd';

const { Meta } = Card;
interface Props {}

const PostCard = (props: Props) => {
  return (
    <>
      <div className='justify-center'>
        <Card
          hoverable
          style={{ width: 240 }}
          className='m-5'
          cover={
            <img
              alt='example'
              src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            />
          }
        >
          <Meta title='Europe Street beat' description='www.instagram.com' />
        </Card>
      </div>
    </>
  );
};

export default PostCard;
