import { client } from "@/utils/db"
import { LoanFormData } from '@/Interfaces/loan.interface';

export class LoanRepository {
    // Create a loan
    static async createLoan(data: LoanFormData): Promise<LoanFormData> {
        const {
            full_name,
            loan_amount,
            loan_tenure,
            employment_status,
            reason_for_loan,
            employment_address1,
            employment_address2,
            user_id
        } = data;

        const query = `
          INSERT INTO loans 
            (user_id, full_name, loan_amount, loan_tenure, employment_status, reason_for_loan, employment_address1, employment_address2) 
          VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;

        const { rows } = await client.query(query, [
            user_id,
            full_name,
            loan_amount,
            loan_tenure,
            employment_status,
            reason_for_loan,
            employment_address1,
            employment_address2,
        ]);

        return rows[0];
    }

    // View loans by user ID
    static async getLoansByUserId(userId: number): Promise<any[]> {
        const query = `SELECT * FROM loans WHERE user_id = $1`;
        const { rows } = await client.query(query, [userId]);
        return rows;
    }

    // View all loans
    static async getAllLoans(): Promise<any[]> {
        const query = `SELECT * FROM loans`;
        const { rows } = await client.query(query);
        return rows;
    }

    // View loan by ID
    static async getLoanById(id: number): Promise<any> {
        const query = `SELECT * FROM loans WHERE id = $1`;
        const { rows } = await client.query(query, [id]);
        return rows[0];
    }

    // Update loan status (Example: status like pending, approved, rejected)
    static async updateLoanStatus(id: number, status: string): Promise<void> {
        const query = `UPDATE loans SET loan_status = $1 WHERE id = $2`;
        await client.query(query, [status, id]);
    }

    // Delete a loan by ID
    static async deleteLoan(id: number): Promise<void> {
        const query = `DELETE FROM loans WHERE id = $1`;
        await client.query(query, [id]);
    }
}
