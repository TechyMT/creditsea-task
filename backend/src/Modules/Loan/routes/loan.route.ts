import { Router } from 'express';
import { LoanController } from '../controllers/loan.controller';

export const router = Router();

router.post('/apply', LoanController.submitLoanApplication); // Submit loan for a user
router.get('/user/:userId', LoanController.viewLoansByUser); // View all loans for a user
router.get('/', LoanController.viewAllLoans); // View all loans
router.get('/:id', LoanController.viewLoanById); // View loan by ID
router.put('/:id/status', LoanController.updateLoanStatus); // Update loan status
router.delete('/:id', LoanController.deleteLoan); // Delete loan


