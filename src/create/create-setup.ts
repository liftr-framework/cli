import { mkdirSync, statSync, existsSync} from 'fs-extra';
const ora = require('ora');
import { createApp } from './create-app';
import { createServer } from './create-server';
import { dependencies } from './dependencies';
import { createConfig } from './create-config';
import { createExampleApi } from './create-example-api';
import { Spinner } from '../types/spinner.type';
import { createNodemonConfig } from './nodemon';
import { createTesting } from './testing/create-testing';
import { createUtil } from './create-util';

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
        statSync(setupName);
        // spinner.stop(true);
        clearTimeout(timeout);
        spinner.stop();
        return console.error('There is already a file/directory with this name.');
      } catch (error) {
        // FILE DOESNT EXIST
      }

    if (!existsSync(setupName)) {
       await mkdirSync(setupName);
    }
    if (!existsSync(process.cwd() + `/${setupName}/src`)) {
        await mkdirSync(process.cwd() + `/${setupName}/src`);
    }
    const setupServer: string = process.cwd() + `/${setupName}/src/server.ts`;
    const setupApp: string = process.cwd() + `/${setupName}/src/app.ts`;
    const setupConfig: string = process.cwd() + `/${setupName}/tsconfig.json`;
    const setupNodemon: string = process.cwd() + `/${setupName}/nodemon.json`;

    await createExampleApi(setupName);
    await createConfig(setupConfig);
    await createUtil(setupName);
    createNodemonConfig(setupNodemon);
    createServer(setupServer);
    createApp(setupApp);
    await createTesting(setupName);
    await dependencies(setupName, spinner);
};
