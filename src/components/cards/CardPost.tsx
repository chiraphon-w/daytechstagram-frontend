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
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Post } from '../types';

const { Meta } = Card;

interface CardPostProps {
  posts: Post[];
  // onPostEdit: (id: number, text: string) => void;
  // onPostDelete: (id: number) => void;
}

const CardPost: React.FC<CardPostProps> = ({ posts }) => {
  const router = useRouter();
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);
  const [desc, setDesc] = useState('');

  const renderedFeed = posts.map((post) => {
    return (
      <>
        <div key={post.id}>
          <Card
            title={<p className='text-xs text-gray-500'>updated on {post.updated}</p>}
            hoverable
            style={{ width: 600 }}
            className='my-4'
            extra={[
              <Link shallow={true} href='/posts/desc'>
                <EditOutlined
                  key='editPost'
                  onClick={() => {
                    setModalActiveEditPost(true);
                  }}
                  className='pr-3'
                />
              </Link>,

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
                src={post.image}
              />
            }
          >
            <Meta className='pb-3' title={post.userId} />
            <p className='text-gray-500'>{post.desc}</p>
            <CardComment />
            <FormComment />
          </Card>
        </div>
      </>
    );
  });
  return <div>{renderedFeed}</div>;
};

export default CardPost;
