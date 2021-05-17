import { ReactNode } from "react";

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

export interface MainLayoutProps {
  children: JSX.Element & ReactNode;
}