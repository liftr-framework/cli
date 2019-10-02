import { appendFile, readFile, writeFile } from 'fs-extra';

export const addRoute = async (newRouteName: string, path: string) => {
    try {
        const file: Buffer = await readFile(process.cwd() + '/src/routes/' + path + '.routes.ts');
        const position2 = file.indexOf("import { Route } from '@liftr/core';") + 37;
        const importStatement = `
import { ${newRouteName}Controller } from '@controllers/${newRouteName}/${newRouteName}.controller';
`;
        const newFile = [
            file.slice(0, position2),
            importStatement,
            file.slice(position2)].join('');
        const route = `
export const ${newRouteName}Route = Route.get('/${newRouteName}', ${newRouteName}Controller);
    `;
        await writeFile(process.cwd() + '/src/routes/' + path + '.routes.ts', newFile);
        await appendFile(process.cwd() + '/src/routes/' + path + '.routes.ts', route);
    } catch (error) {
        console.error('Error:', error);
    }
};
