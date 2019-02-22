import fs from 'fs-extra';
import * as path from 'path';

export const createExampleApi = async (setupName: string) => {
    const fileContent = null;
    const RoutePath: string = process.cwd() + `/${setupName}/src/routes/liftr.route.ts`;
    const ControllerPath: string = process.cwd() + `/${setupName}/src/controllers/liftr.controller.ts`;
    const MiddleWarePath: string = process.cwd() + `/${setupName}/src/middleware/liftr.middleware.ts`;
    const RoutingPath: string = process.cwd() +  `/${setupName}/src/routes/index.ts`;

    const creationArray: string[] = [
        RoutePath,
        ControllerPath,
        RoutingPath,
        MiddleWarePath,
    ];
    await creationArray.forEach(async (createPath) => {
        await fs.writeFile(createPath, fileContent, (err) => {
            // if (err) throw err;
        });
        if (createPath.includes('index.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/routes.ts'), createPath);
        }
        if (createPath.includes('liftr.route.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/route.ts'), createPath);
        }
        if (createPath.includes('liftr.controller.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/controller.ts'), createPath);
        }
        if (createPath.includes('liftr.middleware.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/middleware.ts'), createPath);
        }
    });
};
