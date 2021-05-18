import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { updatePost } from 'src/lib/api/postApi';

const { TextArea } = Input;
const FormEditPost = ({ feed, jwt }: any) => {
  const route = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const onFinish = async (values: any) => {
    // const formdatas: FormData = new FormData();
    // formdatas.append('desc', values.editDesc);
    const { data }: any = await updatePost(values, feed.id, jwt);
    message.success('Update post complete');
    return route.push('/posts');
  };

  const handleCancel = () => {
    return route.push('/posts');
  };
  return (
    <>
      <Form
        {...layout}
        name='formEditPost'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='desc'
          rules={[{ required: true, message: 'Please Enter Descripton' }]}
        >
          <TextArea
            placeholder="What's happening?"
            autoSize
            className='my-2'
            defaultValue={feed.desc}
          />
        </Form.Item>
        <Form.Item>
          <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
            <Button type='dashed' htmlType='submit'>
              Edit Post
            </Button>
            <Button onClick={handleCancel} type='dashed'>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormEditPost;
