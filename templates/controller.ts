import { Request, Response } from 'express';

export const liftrController = (req: Request, res: Response) => {
    res.send('Lift off!');
};
