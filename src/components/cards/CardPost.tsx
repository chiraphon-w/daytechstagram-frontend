import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Image, Avatar, Card } from 'antd';
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
import decryptToken from 'src/lib/utils/decryptToken';
import Cookies from 'js-cookie';

const { Meta } = Card;

interface CardPostProps {
  posts: Post[];
  // onPostEdit: (id: number, text: string) => void;
  onPostDelete: (id: number) => void;
  // decryptJwt: { username: string; iat: number; exp: number };
}

const CardPost: React.FC<CardPostProps> = ({ posts, onPostDelete }) => {
  useEffect(() => {
    const jwt: any = Cookies.get('jwt');
    const decryptJwt = decryptToken(jwt);
    setUserInfo(decryptJwt);
    console.log('decryptJwt ', decryptJwt);
  }, []);

  // const decryptJwt = decryptToken(jwt);

  const [userInfo, setUserInfo] = useState({});

  const router = useRouter();
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);
  const [desc, setDesc] = useState('');
  const id = Math.floor(Math.random() * 10000) + 1;

  const onPostDeleteActivate = (id: number) => {
    onPostDelete(id);
  };


  const renderedFeed = posts.map((post) => {
    return (
      <>
        <div>
          <Card
            key={post.id}
            title={
              <p className='text-xs text-gray-500'>updated on {new Date(post.updated).toLocaleDateString("us-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
    .toString()}</p>
            }
            hoverable
            style={{ width: 600 }}
            className='my-4'
            extra={
              post.user.username === userInfo.username ? (
                [
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
                    onClick={() => onPostDeleteActivate(post.id)}
                  />,
                ]
              ) : (
                <></>
              )
            }
            cover={
              <img alt='example' src={`http://localhost:3000/${post.image}`} />
            }
          >
            <Meta
              className='pb-3'
              title={post.user.username}
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
            />

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
