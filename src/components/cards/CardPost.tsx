import React, { useState } from 'react';
import { Form, Input, Button, Image, Typography, Card } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';
import FormComment from '@/components/forms/FormComment';
import CardComment from '@/components/cards/CardComment';
import { useRecoilState } from 'recoil';
import { editPostState } from '../recoil/atom';
import FormEditPost from '@/components/forms/FormEditPost';

const { Meta } = Card;
interface Props {}

const CardPost = () => {
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);

  const [modalEditContent, setModalEditContent] = useState<JSX.Element>();

  const handleEditPost = () => {
    console.log('yo');
    alert('test');
    setModalEditContent(<FormEditPost />);
  };
  return (
    <>
      <div>
        <Card
          title={<p className='text-xs text-gray-500'>updated on 06:43 pm</p>}
          hoverable
          style={{ width: 500 }}
          className='my-4'
          extra={[
            <EditOutlined
              key='editPost'
              onClick={() => { 
                handleEditPost;
                setModalActiveEditPost(true);
               
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
