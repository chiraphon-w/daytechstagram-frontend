import React from 'react';
import { Form, Input, Button, Image, Typography, Card } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CheckSquareOutlined,
  } from '@ant-design/icons';
import FormComment from '@/components/forms/FormComment';
const { Meta } = Card;
interface Props {}

const CardComment = (props: Props) => {
  return (
    <>
      <div className='items-center'>
        <Card
          title={<p className='text-xs text-gray-500'>updated on 06:43 pm</p>}
          hoverable
          style={{ width: 450 }}
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
        >
          <Meta className='pb-3' title='User 2' />
          <p className='text-gray-500'>Wowww!!! SHE'S SO HOTTT!!!🔥🔥🔥🔥</p>
        </Card>
      </div>
    </>
  );
};

export default CardComment;
