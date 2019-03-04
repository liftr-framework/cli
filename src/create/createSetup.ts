import fs from 'fs-extra';
const util = require('util');
const ora = require('ora');
import { createApp } from './createApp';
import { createServer } from './createServer';
import { dependencies } from './dependencies';
import { createConfig } from './createConfig';
import { createExampleApi } from './createExampleApi';
import { Spinner } from '../types/spinner.type';
import { createNodemonConfig } from './nodemon';

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
        fs.statSync(setupName);
        // spinner.stop(true);
        clearTimeout(timeout);
        spinner.stop();
        return console.error('There is already a file/directory with this name.');
      } catch (error) {
        // FILE DOESNT EXIST
      }

    if (!fs.existsSync(setupName)) {
       await fs.mkdirSync(setupName);
    }
    if (!fs.existsSync(process.cwd() + `/${setupName}/src`)) {
        await fs.mkdirSync(process.cwd() + `/${setupName}/src`);
    }
    const setupServer: string = process.cwd() + `/${setupName}/src/server.ts`;
    const setupApp: string = process.cwd() + `/${setupName}/src/app.ts`;
    const setupConfig: string = process.cwd() + `/${setupName}/tsconfig.json`;
    const setupNodemon: string = process.cwd() + `/${setupName}/nodemon.json`;

    const liftrProject: any = util.promisify(createExampleApi);
    liftrProject(setupName, spinner)
        .then(createConfig(setupConfig))
        .then(createNodemonConfig(setupNodemon))
        .then(createServer(setupServer))
        .then(createApp(setupApp))
        .then(dependencies(setupName, spinner));
};
