export interface Post {
  id: number;
  image: string;
  desc: string;
  created: string;
  updated: string;
  userId: number;
  user: {
    id: number;
    username: string;
  };
}
