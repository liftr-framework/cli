import { readFile, writeFile } from 'fs-extra';

export const addModule = async (newModuleName: string, flatCheck: boolean) => {
    const file: Buffer = await readFile(process.cwd() + '/src/routes/LiftrRoutingModule.ts');
    const position1 = file.indexOf(`
export const routes: AppRouter[] = [
`) + 38;
    const output = `
  {
    path: '/${newModuleName}',
    module: ${newModuleName}Module,
    middleware: [],
  },`;
    let importStatement;
    if (flatCheck) {
      importStatement = `
import { ${newModuleName}Module } from '@routes/${newModuleName}.module';`;
    } else {
      importStatement = `
import { ${newModuleName}Module } from '@routes/${newModuleName}/${newModuleName}.module';`;
    }
//     const importStatement = `
// import { ${newModuleName}Module } from '@routes/${newModuleName}/${newModuleName}.module';`;
    const newFileContent = [file.slice(0, position1), output, file.slice(position1)].join('');
    const position2 = newFileContent.indexOf("import { AppRouter } from '@liftr/core';") + 40;
    const finalFile = [
        newFileContent.slice(0, position2),
        importStatement,
        newFileContent.slice(position2)].join('');
    const pathToNewFile = process.cwd() + '/src/routes/LiftrRoutingModule.ts';
    await writeFile(pathToNewFile, finalFile);
};
