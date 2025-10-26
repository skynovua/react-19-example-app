import { httpClient } from './httpClient';
import { API_ENDPOINTS, type PostResponse } from '../types';

export class PostService {
  /**
   * Fetch a post by ID
   */
  async getPostById(postId: string | number): Promise<PostResponse> {    
    return httpClient.get<PostResponse>(
      API_ENDPOINTS.POSTS.BY_ID(postId)
    );
  }

  /**
   * Fetch all posts
   */
  async getAllPosts(): Promise<PostResponse[]> {    
    return httpClient.get<PostResponse[]>(
      API_ENDPOINTS.POSTS.ALL
    );
  }
}

// Singleton instance
export const postService = new PostService();
