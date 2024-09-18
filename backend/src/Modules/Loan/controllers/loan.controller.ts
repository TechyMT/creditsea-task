import { Request, Response } from 'express';
import { LoanService } from '../services/loan.service';

export class LoanController {
  // Submit loan application
  static async submitLoanApplication(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.body; // Pass the userId
      if (!user_id) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
      const loanData = req.body;
     const loan =  await LoanService.applyForLoan(loanData);
      res.status(200).json({ message: 'Loan application submitted successfully.', loan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while submitting the loan application.' });
    }
  }

  // View all loans for a user
  static async viewLoansByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId, 10); // User ID from route
      const loans = await LoanService.getLoansByUserId(userId);
      res.status(200).json(loans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching loans.' });
    }
  }

  // View all loans
  static async viewAllLoans(req: Request, res: Response): Promise<void> {
    try {
      const loans = await LoanService.getAllLoans();
      res.status(200).json(loans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching loans.' });
    }
  }

  // View a specific loan by ID
  static async viewLoanById(req: Request, res: Response): Promise<void> {
    try {
      const loanId = parseInt(req.params.id, 10);
      const loan = await LoanService.getLoanById(loanId);
      if (!loan) {
        res.status(404).json({ message: 'Loan not found.' });
      } else {
        res.status(200).json(loan);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching the loan.' });
    }
  }

  // Update loan status
  static async updateLoanStatus(req: Request, res: Response): Promise<void> {
    try {
      const loanId = parseInt(req.params.id, 10);
      const { status } = req.body;
      await LoanService.updateLoanStatus(loanId, status);
      res.status(200).json({ message: 'Loan status updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the loan status.' });
    }
  }

  // Delete loan
  static async deleteLoan(req: Request, res: Response): Promise<void> {
    try {
      const loanId = parseInt(req.params.id, 10);
      await LoanService.deleteLoan(loanId);
      res.status(200).json({ message: 'Loan deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the loan.' });
    }
  }
}
