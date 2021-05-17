import React from 'react';
import { Form, Input, Button, Image } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { createPostState } from '../recoil/atom';
const { TextArea } = Input;

interface Props {}

const FormComment = () => {
    const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);
    const route = useRouter();
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 24 },
    };

    const onFinish = (values: { desc: string }) => {
        console.log('Success:', values);
        // setModalActivePost(false);
        return route.push('/posts');
      };
   
  return (
    <>
      <Form
        {...layout}
        name='formComment'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout='inline'
        style={{ justifyContent: 'center' }}
      >
        <Form.Item
          name='descComment'
          rules={[{ required: true, message: 'Please Enter Comment' }]}
        >
          <TextArea style={{ width: 420 }} placeholder="Enter your comment" autoSize className='my-2' />
        </Form.Item>
        <Form.Item className='pt-2 m-0'>
          <Button onClick={() => {onFinish}} type='dashed' htmlType='submit'>
            comment
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormComment;