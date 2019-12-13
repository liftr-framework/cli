const ora = require('ora');
import { createSkeleton } from './create-skeleton';
import { Spinner } from '../types/spinner.type';

export const createSetup = async (setupName: string) => {
    const spinner: Spinner = ora('Setting up Liftr project and installing dependencies. This may take a while... ')
    .start();
    try {
      await createSkeleton(setupName, spinner);
    } catch (error) {
      console.error(error);
    }
};
