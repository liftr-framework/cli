import fs from 'fs-extra';
import chalk from 'chalk';
import { checkExistence } from '../helpers';

export const createController = (ControllerName: string) => {
    const fileContent: string = `
import { Request, Response } from 'express';

export let ${ControllerName}Controller = (req: Request, res: Response) => {
        // Methods to respond to the request at the route e.g:
        res.send('${ControllerName} route');
    };
`;
    const filepath: string = process.cwd() + `/src/controllers/${ControllerName}.controller.ts`;
    const check = checkExistence(`/src/routes/${ControllerName}.route.ts`)
    if(!check) {
        fs.writeFile(filepath, fileContent, (err) => {
            if (err) throw err;
        });
    }
    else {
        console.error(chalk.red(`Controller named ${ControllerName} already exists!`)); 
        process.exit(1);
    }
};
