import { Request, Response, NextFunction } from 'express';

export const LiftrMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next();
};
