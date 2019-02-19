import fs from 'fs-extra';
import { createController } from './createController';

export const createRoute = (RouteName: string) => {
    const fileContent = `
import { Router, Request, Response, NextFunction} from "express"
import { ${RouteName}Controller } from "@controllers/${RouteName}.controller"

export const ${RouteName}Route: Router = Router()
    .get('/', ${RouteName}Controller);
`;
    const filepath = process.cwd() + `/src/routes/${RouteName}.route.ts`;
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
    });
    createController(RouteName);
};
