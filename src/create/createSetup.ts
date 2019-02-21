import fs from 'fs-extra';
const util = require('util');
const ora = require('ora');
import { createApp } from './createApp';
import { createServer } from './createServer';
import { dependencies } from './dependencies';
import { createConfig } from './createConfig';
import { createExampleApi } from './createExampleApi';

export const createSetup = async (setupName: string) => {
    const spinner = ora('Setting up Scaffold project').start();
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
    const setupServer = process.cwd() + `/${setupName}/src/server.ts`;
    const setupApp = process.cwd() + `/${setupName}/src/app.ts`;
    const setupConfig = process.cwd() + `/${setupName}/tsconfig.json`;

    const liftrProject = util.promisify(createExampleApi);
    liftrProject(setupName, spinner)
        .then(createConfig(setupConfig))
        .then(createServer(setupServer))
        .then(createApp(setupApp))
        .then(dependencies(setupName, spinner));
};
