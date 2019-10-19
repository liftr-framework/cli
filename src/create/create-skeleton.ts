import { Spinner } from '../types/spinner.type';
import chalk from 'chalk';
import shelljs from 'shelljs';
const { exec } = require('child_process');

export const createSkeleton = async (setupName: string, spinner: Spinner) => {
  try {
    await shelljs.exec(`git clone https://github.com/farisT/liftr.git ${setupName}`, {silent: true});
    await exec(
      `cd ${setupName} && npm install `,
      (error: Error, stdout: string, stderr: string) => {
        if (error) {
          console.log(error);
          return;
        }
        spinner.succeed(chalk.green(`Your Liftr project is ready! cd into ${setupName} and run npm start.`));
        // old warning - (check if ts-node is necessary)
        spinner.info(
          chalk.blue(
            'Make sure you have ts-node and typscript installed on your machine.',
          ),
        );
        spinner.warn(chalk.yellow('If not run: "npm i -g ts-node typescript".'));
        shelljs.exec(`cd ${setupName} && rm -rf .git`);
      },
    );
  } catch (error) {
    console.error(error);
  }
};
