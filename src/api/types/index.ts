import type { User, Post } from '@prisma/client';

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Re-export Prisma types
export type { User, Post } from '@prisma/client';

// Helper type to convert Date to string
type DateToString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

// Extended types for API responses
export type UserResponse = DateToString<User>;

export interface PostResponse extends Omit<DateToString<Post>, 'tags'> {
  author: string;
  authorAvatar: string;
  tags: string[];
}

export interface UserWithPostsResponse {
  user: UserResponse;
  posts: Array<Pick<Post, 'id' | 'title' | 'content'>>;
}

// API Endpoints
export const API_ENDPOINTS = {
  USERS: {
    RANDOM: '/users/random',
  },
  POSTS: {
    ALL: '/posts',
    BY_ID: (id: string | number) => `/posts/${id}`,
  },
} as const;
