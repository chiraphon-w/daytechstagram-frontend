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

export const editCommentState = atom<boolean>({
  key: 'editCommentST',
  default: false,
});


export const userLoginState = atom<boolean>({
  key: 'userLogin',
  default: false,
});

export const userLogoutState = atom<boolean>({
  key: 'userLogout',
  default: false,
});

