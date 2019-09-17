import { creation } from '../helpers';
import chalk from 'chalk';

export async function createComponent(name: string, content: string, extension: string) {
    try {
        const folderPath =  process.cwd() + `/src/routes/${name}`;
        const filePath = process.cwd() + `/src/routes/${name}/${name}.${extension}.ts`;
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr component named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component', error);
        process.exit(1);
    }
}
