// admin.service.ts
import { AdminRepository } from '../repositories';

export class AdminService {

    // Get statistics
    static async getStatistics(): Promise<any> {
        return AdminRepository.getStatistics();
    }

    // Get recent loans
    static async getRecentLoans(limit: number = 7): Promise<any[]> {
        return AdminRepository.getRecentLoans(limit);
    }
}
