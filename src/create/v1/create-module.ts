import chalk from 'chalk';
import { creation } from '../../helpers';

export const createModule = async (moduleName: string): Promise<void> => {
    const fileContent = `
import { Module } from '@liftr/core';
export const NewModule = Module([])
`;
    try {
        const folderPath =  process.cwd() + `/src/routes/${moduleName}`;
        const filePath = process.cwd() + `/src/routes/${moduleName}/${moduleName}.module.ts`;
        await creation(folderPath, filePath, fileContent);
        console.log(chalk.green(`Liftr module named ${moduleName} created`));
    } catch (error) {
        console.error('An error has occured with creating the module', error);
        process.exit(1);
    }
};
