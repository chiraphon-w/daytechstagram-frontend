import React, { useState } from 'react';
import { Form, Input, Button, Image, Typography, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { Upload } from 'antd';
import Link from 'next/link';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import CardPost from '@/components/cards/CardPost';
import { editCommentState } from '../recoil/atom';

const { TextArea } = Input;
interface Props {}

const FormEditComment = () => {
  const [modalActiveEditComment, setModalActiveEditComment] =
    useRecoilState(editCommentState);

  const route = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };
  console.log('FormEditComment');
  //   router.push("/posts", null, { shallow: true });

  const onFinish = (values: { descPost: string }) => {
    console.log('Success:', values);
    setModalActiveEditComment(false);
    return route.push('/posts');
  };

  const handleCancel = () => {
    setModalActiveEditComment(false);
    return route.push('/posts');
  };
  return (
    <>
      <div className='flex justify-center'>
        <CardPost />
      </div>
      <Modal
        title='Edit Post'
        visible={modalActiveEditComment}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name='formEditComment'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='inline'
        >
          <Form.Item
            name='editComment'
            rules={[{ required: true, message: 'Please Enter Comment' }]}
          >
            <TextArea
              style={{ width: 400 }}
              placeholder='Enter your comment'
              autoSize
              defaultValue="Wowww!!! SHE'S SO HOTTT!!!🔥🔥🔥🔥"
              className='my-2'
            />
          </Form.Item>
          <Form.Item className='pt-2 m-0'>
            <Button
              onClick={() => {
                onFinish;
              }}
              type='dashed'
              htmlType='submit'
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormEditComment;
