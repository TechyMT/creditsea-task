import { UserRepository } from '../repositories/user.repository';
import { User } from '@/Interfaces/user.interface';
import bcrypt from 'bcrypt';

export class UserService {
    // User signup
    static async signup(user: User): Promise<User> {
        const existingUser = await UserRepository.findUserByUsername(user.username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const newuser = await UserRepository.createUser(user);
        return newuser;
    }

    // User login
    static async login(username: string, password: string): Promise<User | null> {
        const user = await UserRepository.findUserByUsername(username);
        if (!user) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }

        delete user.password; // Remove password from the returned user object
        return user; // Return user object if login is successful
    }
}
