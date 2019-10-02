import { creation } from '../helpers';
import chalk from 'chalk';

export async function createComponent(name: string, content: string, extension: string, flatFile: boolean) {
    try {
        const path = flatFile ? `/src/${extension}s` : `/src/${extension}s/${name}`;
        const specialModulePath = flatFile ? '/src/routes' : `/src/routes/${name}`;
        const checkedPath = extension === 'module' ? specialModulePath : path;
        const folderPath = process.cwd() + checkedPath;
        const filePath = process.cwd() + checkedPath + `/${name}.${extension}.ts`;
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr ${extension} named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component', error);
        process.exit(1);
    }
}
