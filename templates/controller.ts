import { Request, Response } from 'express';

export let liftrController = (req: Request, res: Response) => {
    res.send('Lift off!');
};
