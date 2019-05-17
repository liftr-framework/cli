import fs from 'fs-extra';
import chalk from 'chalk';
import { checkExistence } from '../helpers';

export const createMiddleware = (MiddlewareName: string) => {
    const fileContent = `
import { Request, Response, NextFunction } from 'express';

export const ${MiddlewareName}Middleware = (req: Request, res: Response, next: NextFunction) => {
    return next();
};
`;
    const filepath = process.cwd() + `/src/middleware/${MiddlewareName}.middleware.ts`;
    const check = checkExistence(`/src/routes/${MiddlewareName}.route.ts`);
    if (!check) {
        fs.writeFile(filepath, fileContent, (err) => {
                if (err) throw err;
        });
    } else {
        console.error(chalk.red(`Middleware named ${MiddlewareName} already exists!`));
        process.exit(1);
    }
};
