import fs from 'fs-extra';

export const createController = (ControllerName: string) => {
    const fileContent: string = `
import { Request, Response } from 'express';

export let ${ControllerName}Controller = (req: Request, res: Response) => {
        // Methods to respond to the request at the route e.g:
        res.send('${ControllerName} route');
    };
`;
    const filepath: string = process.cwd() + `/src/controllers/${ControllerName}.controller.ts`;
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
    });
};
