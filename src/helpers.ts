import chalk from 'chalk';
import { existsSync, stat, writeFile, outputFile } from 'fs-extra';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

export const checkLiftrProject =  (componentType: string): boolean =>  {
    const routingModulepath = '/src/routes/LiftrRoutingModule.ts';
    if (existsSync(process.cwd() + routingModulepath) || componentType === 'setup') return true;
    else {
        console.error(chalk.red('This is not a Liftr project'));
        console.error(chalk.red('Only setup can run outside of a Liftr project'));
        return false;
    }
};

export const folderExists = async (folderPath: string): Promise<boolean> => {
  return !!(await stat(folderPath).catch(() => false));
};

export async function creation(dirpath: string, filePath: string, fileContent: string): Promise<void> {
    const folderBlackList: string[] = [
        process.cwd() + '/src/middlewares',
        process.cwd() + '/src/routes',
        process.cwd() + '/src/controllers',
    ];
    const arrayContainsFolder = (folderBlackList.indexOf(dirpath) > -1);
    if (arrayContainsFolder) {
        // this path taken if there is --flat command passed (only create files no folder)
        console.log(filePath);
        const exists: Boolean = await folderExists(filePath);
        if (!exists) {
            await writeFile(filePath, fileContent);
        } else throw new Error('File already exists');
    } else {
        // this path taken if there is no --flat command passed (create folder) DEFAULT
        const exists: Boolean = await folderExists(dirpath);
        if (!exists) {
            await outputFile(filePath, fileContent);
        } else throw new Error('Folder already exists');
    }
}

export function loadConfig(componentType: string) {
  return glob.sync(`${componentType}.?s`, {
    cwd: path.resolve(`${__dirname}/component-configs`),
  });
}

export async function getModuleFiles(): Promise<string[]> {
  const sourceFolder = path.join(process.cwd(), '/src/routes/');
  const files = await fs.readdir(sourceFolder);
  const moduleFiles = files.filter((name: string) => name.includes('.module'))
    .map((module) => module.replace('.module.ts', ''));

  return moduleFiles;
}
