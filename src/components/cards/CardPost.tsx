import React, { useEffect, useState } from 'react';
import { Avatar, Card, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import FormComment from '@/components/forms/FormComment';
import CardComment from '@/components/cards/CardComment';
import { useRecoilState } from 'recoil';
import { editPostIdState, editPostState, onPostIdState } from '../recoil/atom';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Post } from '../types';
import decryptToken from 'src/lib/utils/decryptToken';
import Cookies from 'js-cookie';
import FormEditPost from '../forms/FormEditPost';
const { Meta } = Card;

interface CardPostProps {
  posts: Post[];
  onPostEdit: (id: number, text: string) => void;
  onPostDelete: (id: number) => void;
}

const CardPost: React.FC<CardPostProps> = ({
  posts,
  onPostDelete,
  onPostEdit,
}) => {
  useEffect(() => {
    const jwt: any = Cookies.get('jwt');
    const decryptJwt = decryptToken(jwt);
    setUserInfo(decryptJwt);
    console.log('decryptJwt ', decryptJwt);
  }, []);

  const [userInfo, setUserInfo] = useState<any>({});
  // const [selectedId, setSelectedId] = useState(0);
  const [selectedId, setSelectedId] = useState(0);
  const router = useRouter();
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);
  const [desc, setDesc] = useState('');
  const route = useRouter();

  const onPostEditActivate = (id: number) => {
    setSelectedId(id);

    setModalActiveEditPost(true);
    return route.push(`/posts/${id}/desc`);
  };

  const onPostDeleteActivate = (id: number) => {
    onPostDelete(id);
  };
  const handleCancel = () => {
    setModalActiveEditPost(false);
    // return route.push('/posts');
  };
  // console.log(selectedId);
  const renderedFeed = posts.map((post) => {
    return (
      <>
        <div>
          <Card
            key={post.id}
            title={
              <p className='text-xs text-gray-500'>
                updated on{' '}
                {new Date(post.updated)
                  .toLocaleDateString('us-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })
                  .toString()}
              </p>
            }
            hoverable
            style={{ width: 600 }}
            className='my-4'
            extra={
              post.user.username === userInfo.username ? (
                [
                  <EditOutlined
                    key='editPost'
                    onClick={() => {
                      onPostEditActivate(post.id);
                    }}
                    className='pr-3'
                  />,
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
