import fs from 'fs-extra';

export const createMiddleware = (MiddlewareName: string) => {
    const fileContent = `
import { Request, Response, NextFunction } from 'express';

export const ${MiddlewareName}Middleware = (req: Request, res: Response, next: NextFunction) => {
            return next();
        };
`;
    const filepath = process.cwd() + `/${MiddlewareName}.middleware.ts`;
    fs.writeFile(filepath, fileContent, (err) => {
            if (err) throw err;
            console.log('The file was succesfully saved!');
    });
};
