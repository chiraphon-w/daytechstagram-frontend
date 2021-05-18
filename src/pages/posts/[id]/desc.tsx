import {
  Button,
  DatePicker,
  Typography,
  version,
  Layout,
  Menu,
  Breadcrumb,
} from 'antd';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { editPostState, userLoginState } from '@/components/recoil/atom';
import FormEditPost from '@/components/forms/FormEditPost';
import { GetServerSideProps } from 'next';
import getCookies from 'src/lib/utils/cookies';
import decryptToken from 'src/lib/utils/decryptToken';
import { getPostById } from 'src/lib/api/postApi';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

interface serverSideProps {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
  res: ServerResponse;
  params: ParsedUrlQuery | undefined;
}

const desc = ({ feed, jwt }: any) => {
  const [modalActiveEditPost, setModalActiveEditPost] =
    useRecoilState(editPostState);
  const [userToken, setUserToken] = useRecoilState(userLoginState);
  useEffect(() => {
    setUserToken(true);
  }, []);

  return (
    <div>
      <Head>
        <title>Daytech Stagram</title>
      </Head>
      <div className='pt-5'>
        <div className='w-full max-w-4xl mx-auto p-5 text-center'>
          <div className='flex flex-row-reverse space-x-4 space-x-reverse'>
            <Button
              onClick={() => {
                setModalActiveEditPost(true);
              }}
              type='dashed'
            >
              New Post
            </Button>
          </div>
        </div>
      </div>
      <FormEditPost feed={feed} jwt={jwt} />
    </div>
  );
};

export const getServerSideProps = async ({
  req,
  res,
  params, // id ที่กดเลือก
}: serverSideProps) => {
  const reqCookie: string | undefined = req.headers.cookie;
  const jwt: string = await getCookies('jwt', reqCookie);
  const decryptJwt: string | object = await decryptToken(jwt);
  let postId: string | string[] | undefined;
  if (!!params) postId = params.id;
  console.log('postId ', postId);

  if (!jwt) {
    res.writeHead(302, { Location: '/signin' }); //302 is a just code to redirect
    res.end();
  }

  const { data }: any = await getPostById(postId, jwt);
  // const { data } = await Axios.get('/posts', {
  //   headers: {
  //     Authorization: `Bearer ${jwt}`,
  //   },
  // });

  return {
    props: {
      decryptJwt,
      jwt,
      feed: data,
      // feeds: data,
    },
  };
};

export default desc;
