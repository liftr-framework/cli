import chalk from 'chalk';

export const checkName = (name: string|boolean) => {
    if (name === true) {
        console.error(chalk.red('Invalid command: No name found after the command'));
        process.exit(1);
    }
};
