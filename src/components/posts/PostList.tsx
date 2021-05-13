import {
  Button,
  Divider 
} from 'antd';

import React from 'react';
import PostCard from '@/components/posts/PostCard';
import { useRecoilState } from 'recoil';
import { createPostState } from '../recoil/atom';
interface Props {}

const PostList = () => {
  const [modalActivePost, setModalActivePost] = useRecoilState(createPostState);

  return (
    <div>
      <div className='pt-5'>
        <Button
          type='primary'
          shape='circle'
          style={{ float: 'right' }}
          onClick={() => setModalActivePost(true)}
        >
          +
        </Button>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
          <h1 className='text-lg font-bold text-gray-400'>Posts</h1>
          <div className='flex p-5 justify-center'>
            <PostCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
