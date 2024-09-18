// admin.repository.ts
import { client } from "@/utils/db";

export class AdminRepository {


    // Get statistics from the loans table
    static async getStatistics(): Promise<any> {

        try {
            const result = await client.query(`SELECT 
    COUNT(*) FILTER (WHERE loan_status = 'PENDING') AS pending_loans,
    COUNT(*) FILTER (WHERE loan_status = 'APPROVED') AS approved_loans,
    COUNT(*) FILTER (WHERE loan_status = 'REJECTED') AS rejected_loans,
    COUNT(*) AS total_loans,
    COUNT(*) FILTER (WHERE loan_status = 'REPAID') AS repaid_loans,
    SUM(loan_amount) FILTER (WHERE loan_status = 'APPROVED') AS cash_disbursed,
    SUM(loan_amount) FILTER (WHERE loan_status = 'REPAID') AS cash_repaid
FROM loans;
`);

            //getActiveUsers
            const activeUsers = await client.query(`SELECT COUNT(*) as active_users FROM users;`);

            return {
                pending_loans: parseInt(result.rows[0].pending_loans),
                approved_loans: parseInt(result.rows[0].approved_loans),
                rejected_loans: parseInt(result.rows[0].rejected_loans),
                total_loans: parseInt(result.rows[0].total_loans),
                active_users: parseInt(activeUsers.rows[0].active_users),
                cash_disbursed: parseInt(result.rows[0].cash_disbursed ? result.rows[0].cash_disbursed : 0),
                cash_received: parseInt(result.rows[0].cash_repaid ? result.rows[0].cash_repaid : 0),
                repaid_loans: parseInt(result.rows[0].repaid_loans)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // Get recent loans
    static async getRecentLoans(limit: number = 7): Promise<any[]> {
        const result = await client.query(`
      SELECT * FROM loans
      ORDER BY created_at DESC
      LIMIT $1
    `, [limit]);
        return result.rows;
    }
}
