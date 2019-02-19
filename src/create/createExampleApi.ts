import fs from 'fs-extra';
import * as path from 'path';

export const createExampleApi = async (setupName: string, spinner: any) => {
    const fileContent = null;
    const RoutePath = process.cwd() + `/${setupName}/src/routes/scaffold.route.ts`;
    const ControllerPath = process.cwd() + `/${setupName}/src/controllers/scaffold.controller.ts`;
    const RoutingPath = process.cwd() +  `/${setupName}/src/routes/index.ts`;

    const creationArray = [
        RoutePath,
        ControllerPath,
        RoutingPath,
    ];
    await creationArray.forEach(async (createPath) => {
        await fs.writeFile(createPath, fileContent, (err) => {
            // if (err) throw err;
        });
        if (createPath.includes('index.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/routes.ts'), createPath);
        }
        if (createPath.includes('scaffold.route.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/route.ts'), createPath);
        }
        if (createPath.includes('scaffold.controller.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/controller.ts'), createPath);
        }
    });
};
