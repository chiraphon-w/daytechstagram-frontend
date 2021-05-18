import React, { useState } from 'react';

import { Form, Input, Button, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { createPostState } from '../recoil/atom';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const { TextArea } = Input;

interface FormPostProps {
  // posts: Post[];
  onMessagePost: (desc: string, file: any) => Promise<void>;
}

const FormPost: React.FC<FormPostProps> = ({ onMessagePost }) => {
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
  const route = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const [desc, setDesc] = useState('');

  const onFinish = (values: { descPost: string; fileList: any }) => {
    onMessagePost(values.descPost, values.fileList.file.originFileObj);
    setDesc('');
    setModalActivePost(false);
    return route.push('/posts');
  };

  const handleCancel = () => {
    setModalActivePost(false);
    return route.push('/posts');
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
            <TextArea
              placeholder="What's happening?"
              autoSize
              onChange={(e) => setDesc(e.target.value)}
              className='my-2'
            />
          </Form.Item>
          <Form.Item
            name='fileList'
            rules={[{ required: true, message: 'Please Upload a Photo' }]}
          >
            <Upload listType='picture' maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
              <Button type='dashed' htmlType='submit'>
                Post
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormPost;

// tsrafce
