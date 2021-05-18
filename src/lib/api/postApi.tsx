import axios from 'axios';

export const getPostById = async (
  postId: string | string[] | undefined,
  accessToken: string
) => {
  // const { accessToken }: any = await getAccessToken();
  const url = process.env.API_URL + '/posts/' + postId;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const result = await axios.get(url, config);
    console.log('result', result);
    return result;
  } catch (e) {
    console.log(e.response);
  }
};

export const updatePost = async (
  values: any,
  postId: number,
  accessToken: string
) => {
  const url = process.env.API_URL + '/posts/' + postId + '/desc';

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // 'content-type': 'application/json;charset=utf-8',
    },
  };
  try {
    // url ที่จะยิงไป, ค่า paramiter ที่รับมา, config ที่แนบไป ex.headers
    console.log('values', values);
    const result = await axios.patch(url, values, config);
    console.log('result', result);
    return result;
  } catch (e) {
    console.log(e.response);
  }
};
