import chalk from 'chalk';
import { existsSync, stat, mkdir, writeFile } from 'fs-extra';
// import glob from 'glob';

export const checkName = (name: string|boolean) => {
    if (typeof name === 'string') return true;
    else {
        console.error(chalk.red('Invalid command: No name found after the command'));
        process.exit(1);
    }
};

export const checkExistence =  (path: string): boolean =>  {
    if (existsSync(process.cwd() + path)) return true;
    else {
        console.error(chalk.red('This is not a Liftr project, commands are only available in a Liftr project'));
        return false;
    }
};

export const checkLiftrProject =  (): boolean =>  {
    const path = '/src/routes/LiftrRoutingModule.ts';
    if (existsSync(process.cwd() + path)) return true;
    else {
        console.error(chalk.red('This is not a Liftr project, commands are only available in a Liftr project'));
        return false;
    }
};

export const folderExists = async (path: string): Promise<boolean> => !!(await stat(path).catch(() => false));

export async function creation(dirpath: string, filePath: string, fileContent: string): Promise<void> {
    const folderBlackList = [
        process.cwd() + '/src/middlewares',
        process.cwd() + '/src/routes',
        process.cwd() + '/src/controllers',
    ];
    console.log(filePath);
    const arrayContainsFolder = (folderBlackList.indexOf(dirpath) > -1);
    if (arrayContainsFolder) {
        // this path taken if there is --flat command passed (only create files no folder)
        const exists: Boolean = await folderExists(filePath);
        if (!exists) {
            await writeFile(filePath, fileContent);
        } else throw new Error('File already exists');
    } else {
        // this path taken if there is no --flat command passed (create folder) DEFAULT
        const exists: Boolean = await folderExists(dirpath);
        console.log('exists', exists);
        console.log('filepath', filePath);
        if (!exists) {
            await mkdir(dirpath);
            await writeFile(filePath, fileContent);
        } else throw new Error('Folder already exists');
    }
}

// export function findModuleInFolder(path: string) {
//     const fullpath = '/src/routes/' + path + '/*.module.ts';
//     const mod = glob(process.cwd() +  fullpath, {}, (err, files) => files);
//     console.log(mod);
// }
