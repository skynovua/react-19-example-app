export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio?: string;
  location?: string;
  joinedDate?: string;
  website?: string;
  github?: string;
  twitter?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
}

export interface UserData {
  user: User;
  posts: Post[];
}
