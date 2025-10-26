import { postService } from '../api/client';
import type { PostResponse } from '../api/types';

// Cache for post promises by ID
const postPromiseCache = new Map<string, Promise<PostResponse>>();

/**
 * Get or create a promise for fetching a post by ID
 */
export function getPostPromise(postId: string): Promise<PostResponse> {
  let promise = postPromiseCache.get(postId);
  
  if (!promise) {
    promise = postService.getPostById(postId);
    postPromiseCache.set(postId, promise);
  }
  
  return promise;
}

/**
 * Clear the post cache for a specific ID or all posts
 */
export function clearPostCache(postId?: string): void {
  if (postId) {
    postPromiseCache.delete(postId);
  } else {
    postPromiseCache.clear();
  }
}
