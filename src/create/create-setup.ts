import { statSync } from 'fs-extra';
const ora = require('ora');
import { createSkeleton } from './create-skeleton';
import { Spinner } from '../types/spinner.type';

export const createSetup = async (setupName: string) => {
    const spinner: Spinner = ora('Setting up Liftr project').start();
    spinner.spinner = 'moon';
    let timeout: any;

    timeout = setTimeout(() => {
        spinner.color = 'yellow';
        spinner.spinner = 'earth';
        spinner.text = 'Creating necessary files and installing dependencies. This may take a while...';
    }, 3000);
    try {
        await statSync(setupName);
        clearTimeout(timeout);
        spinner.stop();
        return console.error('There is already a file/directory with this name.');
      } catch (error) {
        // FILE DOESNT EXIST
      }
    await createSkeleton(setupName, spinner);
};
