import { Request, Response, NextFunction } from 'express';

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`User Request - ${req.method} ${req.path}`);
    next();
}
