import fs from 'fs-extra';
import chalk from 'chalk';
import { checkExistence } from '../helpers';
import { createTestController } from './testing/createTestController';

export const createController = async (ControllerName: string) => {
    const fileContent: string = `
import { Request, Response } from 'express';

export let ${ControllerName}Controller = (req: Request, res: Response) => {
        // Methods to respond to the request at the route e.g:
        res.send('${ControllerName} controller');
    };
`;
    const filepath: string = process.cwd() + `/src/controllers/${ControllerName}.controller.ts`;
    const check = checkExistence(`/src/controllers/${ControllerName}.controller.ts`);
    if (!check) {
        await fs.writeFile(filepath, fileContent, (err) => {
            if (err) throw err;
        });
        await createTestController(ControllerName);
    } else {
        console.error(chalk.red(`Controller named ${ControllerName} already exists!`));
        process.exit(1);
    }
};
