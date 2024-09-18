import { Request, Response, NextFunction } from 'express';

export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Admin Request - ${req.method} ${req.path}`);
    next();
}
