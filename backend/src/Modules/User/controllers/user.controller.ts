import { Request, Response } from 'express';
import { UserService } from '../services';

export class UserController {
    // User signup
    static async signup(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const user = await UserService.signup({ username, password });
            res.status(200).json({ message: 'User signed up successfully', user });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

    // User login
    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const user = await UserService.login(username, password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            return res.status(200).json({ user, message: 'Login successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred during login' });
        }
    }
}
