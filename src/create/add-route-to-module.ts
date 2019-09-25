import { readFile, writeFile } from 'fs-extra';

export const addRouteToModule = async (newRouteName: string, path: string) => {
    const file: Buffer = await readFile(process.cwd() + '/src/routes/' + path + '.module.ts');
    const position1 = file.indexOf(`
export const NewModule = Module([
`) + 38;
    const output = `
    {
        route: ${newRouteName}Route,
        middleware: [],
    },
`;
    const importStatement = `
import { ${newRouteName}Route } from '@routes/${newRouteName}/${newRouteName}.routes';`;
    const newFileContent = [file.slice(0, position1), output, file.slice(position1)].join('');
    const position2 = newFileContent.indexOf("import { Module } from '@liftr/core';") + 102;
    const finalFile = [
        newFileContent.slice(0, position2),
        importStatement,
        newFileContent.slice(position2)].join('');
    const pathToNewFile = process.cwd() + '/src/routes/' + path + '.module.ts';
    await writeFile(pathToNewFile, finalFile);
};
