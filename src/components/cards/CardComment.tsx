import React from 'react';
import { Card } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { editCommentState } from '../recoil/atom';
import Link from 'next/link';

const { Meta } = Card;
interface Props {}

const CardComment = () => {
  const [modalActiveEditComment, setModalActiveEditComment] =
  useRecoilState(editCommentState);
  return (
    <>
      <div className='items-center'>
        <Card
          title={<p className='text-xs text-gray-500'>updated on 06:43 pm</p>}
          hoverable
          style={{ width: 550 }}
          className='my-4'
          extra={[
            <Link shallow={true} href='/comments/desc'>
            <EditOutlined
              key='editcomment'
              onClick={() => {
                setModalActiveEditComment(true);
              }}
              className='pr-3'
            />
          </Link>,
            <DeleteOutlined
              key='deletecomment'
              onClick={() => {
                alert('deletecomment');
              }}
            />,
          ]}
        >
          <Meta className='pb-3' title='User 2' />
          <p className='text-gray-500'>Wowww!!! SHE'S SO HOTTT!!!🔥🔥🔥🔥</p>
        </Card>
      </div>
    </>
  );
};

export default CardComment;
