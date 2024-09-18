import { LoanRepository } from '../repositories';
import { LoanFormData } from '@/Interfaces/loan.interface';

export class LoanService {
    static async applyForLoan(data: LoanFormData): Promise<LoanFormData> {
        return await LoanRepository.createLoan(data);
    }

    // Get loans by user ID
    static async getLoansByUserId(userId: number): Promise<any[]> {
        return LoanRepository.getLoansByUserId(userId);
    }

    // Get all loans
    static async getAllLoans(): Promise<any[]> {
        return LoanRepository.getAllLoans();
    }

    // Get loan by ID
    static async getLoanById(id: number): Promise<any> {
        return LoanRepository.getLoanById(id);
    }

    // Update loan status
    static async updateLoanStatus(id: number, status: string): Promise<void> {
        await LoanRepository.updateLoanStatus(id, status);
    }

    // Delete loan
    static async deleteLoan(id: number): Promise<void> {
        await LoanRepository.deleteLoan(id);
    }
}
