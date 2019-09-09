import chalk from 'chalk';
import { existsSync } from 'fs';

export const checkName = (name: string|boolean) => {
    if (name === true) {
        console.error(chalk.red('Invalid command: No name found after the command'));
        process.exit(1);
    }
};

export const checkExistence =  (path: string) =>  {
    const check = existsSync(process.cwd() + path);
    return check;
};
