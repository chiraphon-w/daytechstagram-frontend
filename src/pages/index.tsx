import { GetServerSideProps } from 'next';
import Head from 'next/head';
import getCookies from 'src/lib/utils/cookies';

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Daytech Stagram</title>
        </Head>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //ทำงานก่อน
  // Create a cookies instance

  const reqCookie: string | undefined = req.headers.cookie;
  const jwt: string = await getCookies('jwt', reqCookie);
  // if not found cookie, just redirect to sign in page
  if (jwt) {
    res.writeHead(302, { Location: '/posts' }); //302 is a just code to redirect
    res.end();
  } else {
    res.writeHead(302, { Location: '/signin' }); //302 is a just code to redirect
    res.end();
  }

  return {
    props: {
      status: true,
    },
  };
};
