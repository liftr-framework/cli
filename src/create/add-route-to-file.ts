import { appendFile, readFile, writeFile } from 'fs-extra';

export const addRouteToFile = async (newRouteName: string, path: string, flatCheck: boolean) => {
    try {
        const file: Buffer = await readFile(path);
        const position2 = file.indexOf("import { Route } from '@liftr/core';") + 37;
        let importStatement;
        if (flatCheck) {
            importStatement = `
import { ${newRouteName}Controller } from '@controllers/${newRouteName}.controller';
`;
        } else {
            importStatement = `
import { ${newRouteName}Controller } from '@controllers/${newRouteName}/${newRouteName}.controller';
`;
        }
        const newFile = [
            file.slice(0, position2),
            importStatement,
            file.slice(position2)].join('');
        const route = `
export const ${newRouteName}Route = Route.get('/${newRouteName}', ${newRouteName}Controller);
    `;
        await writeFile(path, newFile);
        await appendFile(path, route);
    } catch (error) {
        console.error('Error:', error);
    }
};
