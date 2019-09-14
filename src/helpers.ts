import chalk from 'chalk';
import { existsSync, stat, mkdir, writeFile } from 'fs-extra';

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

export const fileExists = async (path: string): Promise<boolean> => !!(await stat(path).catch(() => false));

export async function creation(dirpath: string, filePath: string, fileContent: string): Promise<void> {
    const exists: Boolean = await fileExists(dirpath);
    if (!exists) {
        await mkdir(dirpath);
        await writeFile(filePath, fileContent);
    } else throw new Error('File already exists');
}
