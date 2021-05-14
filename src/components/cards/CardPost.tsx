import React from 'react';
import { Form, Input, Button, Image, Typography, Card } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import FormComment from '@/components/forms/FormComment';
import CardComment from '@/components/cards/CardComment';
const { Meta } = Card;
interface Props {}

const CardPost = (props: Props) => {
  return (
    <>
      <div>
        <Card
          title={<p className='text-xs text-gray-500'>updated on 06:43 pm</p> }
          hoverable
          style={{ width: 500 }}
          className='my-4'
          extra={[
            <EditOutlined
              key='editPost'
              onClick={() => {
                alert('editPost');
              }}
              className='pr-3'
            />,
            <DeleteOutlined
              key='deletePost'
              onClick={() => {
                alert('deletePost');
              }}
            />,
          ]}
          cover={
            <img
              alt='example'
              src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            />
          }
        >
          <Meta className='pb-3' title='User 1' />
          <p className='text-gray-500'>I'm so cold 😱❄</p>
          <CardComment />
          <FormComment />
        </Card>
      </div>
    </>
  );
};

export default CardPost;
