import { Request, Response, NextFunction } from 'express';

export const LoanMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Loan Request - ${req.method} ${req.path}`);
    next();
}
