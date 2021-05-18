import React, { useState } from 'react';
import { Form, Input, Button, Image, Typography, Modal } from 'antd';
import { useRecoilState } from 'recoil';
import {
  createPostState,
  editPostIdState,
  editPostState,
  postsState,
} from '../recoil/atom';
import { Upload } from 'antd';
import Link from 'next/link';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import CardPost from '@/components/cards/CardPost';
import { Post } from '../types';
import { updatePost } from 'src/lib/api/postApi';

const { TextArea } = Input;
interface Props {}

const FormEditPost = ({ feed, jwt }: any) => {
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);
  const [posts, setPosts] = useRecoilState(postsState);
  const [selectedId, setSelectedId] = useRecoilState(editPostIdState);
  const [state, setstate] = useState({});

  const route = useRouter();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };
  // console.log('FormEditPost');
  //   router.push("/posts", null, { shallow: true });

  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    // const formdatas: FormData = new FormData();
    // formdatas.append('desc', values.editDesc);
    const { data }: any = await updatePost(values, feed.id, jwt);
    // return route.push('/posts');
  };

  return (
    <>
      {/* <div className='flex justify-center'>
        <CardPost />
      </div> */}

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
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormEditPost;
