import { Request, Response } from 'express';

export let LiftrController = (req: Request, res: Response) => {
    res.send('Lift off!');
};
