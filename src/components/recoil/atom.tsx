import { atom } from 'recoil'; //useState
// import { TodoProps } from '@/components/types/index';



export const createPostState = atom({
  key: 'createPost',
  default: false,
});

