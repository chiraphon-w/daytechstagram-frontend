import { atom } from 'recoil'; //useState
// import { TodoProps } from '@/components/types/index';



export const createPostState = atom<boolean>({
  key: 'createPostST',
  default: false,
});

export const editPostState = atom<boolean>({
  key: 'editPostST',
  default: false,
});

