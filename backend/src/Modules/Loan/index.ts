import { loanRoutes } from './routes';
import { Router } from 'express';

const LoanModule = Router();

LoanModule.use('/loan', loanRoutes);

export { LoanModule };
