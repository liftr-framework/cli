import { Request, Response } from 'express';

export let ScaffoldController = (req: Request, res: Response) => {
    res.send('Lift off!');
};
