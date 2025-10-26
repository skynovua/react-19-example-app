import { Router } from 'express';
import { userController } from './userController';
import { postController } from './postController';

const router = Router();

// User routes
router.get('/users/random', (req, res) => userController.getRandomUser(req, res));

// Post routes
router.get('/posts', (req, res) => postController.getAllPosts(req, res));
router.get('/posts/:id', (req, res) => postController.getPostById(req, res));

export default router;
