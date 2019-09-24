import { creation } from '../helpers';
import chalk from 'chalk';

export async function createComponent(name: string, content: string, extension: string, flatFile: boolean) {
    try {
        const path = flatFile ? `/src/${extension}s` : `/src/${extension}s/${name}`;
        const folderPath = process.cwd() + path;
        const filePath = process.cwd() + path + `/${name}.${extension}.ts`;
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr component named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component', error);
        process.exit(1);
    }
}
