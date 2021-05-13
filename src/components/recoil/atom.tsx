import { atom } from 'recoil'; //useState
// import { TodoProps } from '@/components/types/index';

// export const todoState = atom<TodoProps[]>({
//   key: 'todo',
//   default: [],
// });

export const createPostState = atom({
  key: 'createPost',
  default: false,
});

// export const signFormTypeState = atom<string>({
//   key: 'signFormType',
//   default: 'signIn',
// });

// export const isSelectState = atom({
//   key: 'isSelect',
//   default: '',
// });

// export const clearSearchState = atom({
//   key: 'clearSearch',
//   default: false,
// });
