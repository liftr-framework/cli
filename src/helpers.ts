import chalk from 'chalk';
import fs from 'fs';

export const checkName = (name: string|boolean) => {
    if (name === true) {
        console.error(chalk.red('Invalid command: No name found after the command'));
        process.exit(1);
    }
};

/**
 * @param {string} path the path to be checked for existence
 * @returns {boolean} true/false
 */
export function checkExistence(path: string): boolean {
    const check = fs.existsSync(process.cwd() + path);
    return check;
}
