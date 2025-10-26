import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import type { PostResponse } from '../types';

export class PostController {
  /**
   * GET /api/posts/:id
   * Get a post by ID with author information
   */
  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const postId = parseInt(req.params.id, 10);

      if (isNaN(postId)) {
        res.status(400).json({ error: 'Invalid post ID' });
        return;
      }

      const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { author: true },
      });

      if (!post) {
        res.status(404).json({ error: `Post with ID ${postId} not found` });
        return;
      }

      const response: PostResponse = {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        authorId: post.authorId,
        publishedDate: post.publishedDate.toISOString().split('T')[0],
        readTime: post.readTime,
        tags: JSON.parse(post.tags),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        author: post.author.name,
        authorAvatar: post.author.avatar || '',
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ 
        error: 'Failed to fetch post',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/posts
   * Get all posts with author information
   */
  async getAllPosts(_req: Request, res: Response): Promise<void> {
    try {
      const posts = await prisma.post.findMany({
        include: { author: true },
        orderBy: { publishedDate: 'desc' },
      });

      const response: PostResponse[] = posts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        authorId: post.authorId,
        publishedDate: post.publishedDate.toISOString().split('T')[0],
        readTime: post.readTime,
        tags: JSON.parse(post.tags),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
        author: post.author.name,
        authorAvatar: post.author.avatar || '',
      }));

      res.json(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ 
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

// Singleton instance
export const postController = new PostController();
