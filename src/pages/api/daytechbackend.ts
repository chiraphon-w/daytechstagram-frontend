import axios from 'axios';

export const authAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// export const postAxios = axios.create({
//   baseURL: 'http://localhost:3000',
//   headers: {
//     'Authorization': `Bearer ${token}`,
//   },
// });