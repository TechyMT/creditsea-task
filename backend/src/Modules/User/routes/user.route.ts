import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const router = Router();

router.post('/signup', UserController.signup); // Signup route
router.post('/login', UserController.login);   // Login route


