import fs from 'fs';
import chalk from 'chalk';
import { createController } from './createController';
import { checkExistence } from '../helpers';

export const createRoute = (RouteName: string) => {
    const fileContent = `
import { Router, Request, Response, NextFunction} from "express"
import { ${RouteName}Controller } from "@controllers/${RouteName}.controller"

export const ${RouteName}Route: Router = Router()
    .get('/', ${RouteName}Controller);
`;
    const filepath = process.cwd() + `/src/routes/${RouteName}.route.ts`;
    const check = checkExistence(`/src/routes/${RouteName}.route.ts`);
    if (!check) {
        fs.writeFileSync(filepath, fileContent);
        createController(RouteName);
    } else {
        console.error(chalk.red(`Route named ${RouteName} already exists!`));
        process.exit(1);
    }
};
