import { readFile, writeFile } from 'fs-extra';

export const addRouteToModule = async (newRouteName: string, targetRouteFile: string, path: string) => {
    if (path === undefined) {
        console.error('No module path was provided');
        process.exit(1);
    }
    const file: Buffer = await readFile(path);
    const position1 = file.indexOf(`= Module([
`) + 10;
    const output = `
  {
    route: ${newRouteName}Route,
    middleware: [],
  },
`;
    const importStatement = `
import { ${newRouteName}Route } from './${targetRouteFile}.routes';`;
    const newFileContent = [file.slice(0, position1), output, file.slice(position1)].join('');
    const position2 = newFileContent.indexOf("import { Module, ModuleComponent } from '@liftr/core';") + 54;
    const finalFile = [
        newFileContent.slice(0, position2),
        importStatement,
        newFileContent.slice(position2)].join('');
    await writeFile(path, finalFile);
};
