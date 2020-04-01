import { appendFile, readFile, writeFile } from 'fs-extra';
import chalk from 'chalk';

interface AddRouteToFileParams {
  name: string;
  filePath: string;
  flatFile: boolean;
  endpointMethod?: string;
}

export const addRouteToFile = async ({name, filePath, flatFile, endpointMethod}: AddRouteToFileParams) => {
    try {
        const method = endpointMethod ? endpointMethod : 'get';
        const file: Buffer = await readFile(filePath);
        const position2 = file.indexOf("import { Route } from '@liftr/core';") + 37;
        let importStatement;
        if (flatFile) {
            importStatement = `
import { ${name}Controller } from '@controllers/${name}.controller';
`;
        } else {
            importStatement = `
import { ${name}Controller } from '@controllers/${name}/${name}.controller';
`;
        }
        const newFile = [
            file.slice(0, position2),
            importStatement,
            file.slice(position2)].join('');
        const route = `
export const ${name}Route = Route.${method}('/${name}', ${name}Controller);
    `;
        await writeFile(filePath, newFile);
        await appendFile(filePath, route);
        console.log(chalk.green(`Liftr ${method} route called ${name}Route created in ${filePath}`));
    } catch (error) {
        console.error('Error:', error);
    }
};
