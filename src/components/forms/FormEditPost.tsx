import React, { useState } from 'react';
import { Form, Input, Button, Image, Typography, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { createPostState, editPostState } from '../recoil/atom';
import { Upload } from 'antd';
import Link from 'next/link';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import CardPost from '@/components/cards/CardPost';

const { TextArea } = Input;
interface Props {}

const FormEditPost = () => {
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);

  const route = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };
  // console.log('FormEditPost');
  //   router.push("/posts", null, { shallow: true });

  const onFinish = (values: { descPost: string }) => {
    console.log('Success:', values);
    setModalActiveEditPost(false);
    return route.push('/posts');
  };

  const handleCancel = () => {
    setModalActiveEditPost(false);
    return route.push('/posts');
  };
  return (
    <>
      {/* <div className='flex justify-center'>
        <CardPost />
      </div> */}
      <Modal
        title='Edit Post'
        visible={modalActiveEditPost}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name='formEditPost'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='editDesc'
            rules={[{ required: true, message: 'Please Enter Descripton' }]}
          >
            <TextArea
              placeholder="What's happening?"
              autoSize
              className='my-2'
              defaultValue="I'm so cold 😱❄"
            />
          </Form.Item>
          <Form.Item>
            <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
              <Button type='dashed' htmlType='submit'>
                Edit Post
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormEditPost;
