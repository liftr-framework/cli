import { Request, Response, NextFunction } from 'express';

export const liftrMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return next();
};
