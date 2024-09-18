import { User } from '@/Interfaces/user.interface';
import bcrypt from 'bcrypt';
import { client } from "@/utils/db"

export class UserRepository {
    // Create a new user (Signup)
    static async createUser(user: User): Promise<User> {
        const { username, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing
        const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *;
    `;
        const { rows } = await client.query(query, [username, hashedPassword]);

        delete rows[0].password; // Remove password from the returned user object
        return rows[0];
    }

    // Find user by username
    static async findUserByUsername(username: string): Promise<User | null> {
        const query = `SELECT * FROM users WHERE username = $1`;
        const { rows } = await client.query(query, [username]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
}
