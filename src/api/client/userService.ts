import { httpClient } from './httpClient';
import { API_ENDPOINTS, type UserWithPostsResponse } from '../types';

export class UserService {
  /**
   * Fetch a random user with their posts
   */
  async getRandomUser(): Promise<UserWithPostsResponse> {    
    return httpClient.get<UserWithPostsResponse>(
      API_ENDPOINTS.USERS.RANDOM
    );
  }
}

// Singleton instance
export const userService = new UserService();
