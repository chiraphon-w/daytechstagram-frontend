import React, { useState } from 'react';

interface Props {}
import { Form, Input, Button, Image, Typography, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { createPostState } from '../recoil/atom';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Link from 'next/link';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { TextArea } = Input;

const CreatePostForm = ({}) => {
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const route = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

//   router.push("/posts", null, { shallow: true });
// import { useRouter } from "next/router";

  const onFinish = (values: { desc: string; image: any }) => {
    // values.image = fileList;
    console.log('Success:', values);
    setModalActivePost(false);

    return route.push('/posts');
  };

  const handleCancel = () => {
    setModalActivePost(false);
  };

  return (
    <>
      <Modal
        title='Create Post'
        visible={modalActivePost}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name='formPost'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name='descPost'
            rules={[{ required: true, message: 'Please Enter Descripton' }]}
          >
            <Input.TextArea
              style={{ margin: '24px 0' }}
              placeholder="What's happening?"
            />
          </Form.Item>
          <Form.Item name='imagePost'>
            <Upload listType='picture' maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type='dashed' htmlType='submit'>
              Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePostForm;

// tsrafce
