import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import type { UserWithPostsResponse } from '../types';

export class UserController {
  /**
   * GET /api/users/random
   * Get a random user with their posts
   */
  async getRandomUser(_req: Request, res: Response): Promise<void> {
    try {
      const userCount = await prisma.user.count();
      
      if (userCount === 0) {
        res.status(404).json({ error: 'No users found' });
        return;
      }

      const skip = Math.floor(Math.random() * userCount);
      
      const user = await prisma.user.findFirst({
        skip,
        include: {
          posts: {
            select: {
              id: true,
              title: true,
              content: true,
            },
            orderBy: { publishedDate: 'desc' },
          },
        },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const response: UserWithPostsResponse = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          bio: user.bio,
          location: user.location,
          joinedDate: user.joinedDate.toISOString().split('T')[0],
          website: user.website,
          github: user.github,
          twitter: user.twitter,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        posts: user.posts.map(post => ({
          ...post,
          content: post.content.substring(0, 200) + '...',
        })),
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching random user:', error);
      res.status(500).json({ 
        error: 'Failed to fetch user',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

// Singleton instance
export const userController = new UserController();
