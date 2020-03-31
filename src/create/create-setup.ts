const ora = require('ora');
import { Spinner } from '../types/spinner.type';
import chalk from 'chalk';
import shelljs from 'shelljs';
const { exec } = require('child_process');

export const createSetup = async (setupName: string) => {
    const spinner: Spinner = ora('Setting up Liftr project and installing dependencies. This may take a while... ')
    .start();
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
          spinner.info(
            chalk.blue(
              'Make sure you have typscript installed on your machine.',
            ),
          );
          spinner.warn(chalk.yellow('If not run: "npm i -g typescript".'));
          shelljs.exec(`cd ${setupName} && rm -rf .git`);
        },
      );
    } catch (error) {
      console.error(error);
    }
};
