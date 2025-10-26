import { userService } from '../api/client';
import type { UserWithPostsResponse } from '../api/types';

// Cache for user data promises
let userDataPromise: Promise<UserWithPostsResponse> | null = null;

/**
 * Get or create a promise for fetching random user data
 */
export function getUserDataPromise(): Promise<UserWithPostsResponse> {
  if (!userDataPromise) {
    userDataPromise = userService.getRandomUser();
  }
  return userDataPromise;
}

/**
 * Reset the user data promise to force a new fetch
 */
export function resetUserDataPromise(): void {
  userDataPromise = null;
}
