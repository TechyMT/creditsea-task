// admin.controller.ts
import { Request, Response } from 'express';
import { AdminService } from "../services"

export class AdminController {

    // Get statistics
    static async getStatistics(req: Request, res: Response): Promise<void> {
        try {
            const stats = await AdminService.getStatistics();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching statistics' });
        }
    }

    // Get recent loans
    static async getRecentLoans(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 7;
            const recentLoans = await AdminService.getRecentLoans(limit);
            res.json(recentLoans);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching recent loans' });
        }
    }
}
