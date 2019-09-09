import { writeFile } from 'fs-extra';
import { Spinner } from '../types/spinner.type';
import chalk from 'chalk';
const { exec } = require('child_process');

export const dependencies = async (setupName: string, spinner: Spinner) => {
  const setupPackageJson = process.cwd() + `/${setupName}/package.json`;

  const packageJson: () => void = () => {
    const fileContent = `
        {
            "name": "${setupName}",
            "version": "1.0.0",
            "description": "A project setup with liftr",
            "main": "server.js",
            "scripts": {
              "start": "ts-node -r tsconfig-paths/register src/server.ts",
              "dev": "nodemon",
              "build": "tsc -p .",
              "test": "npm run lint && npm run test:unit",
              "lint": "tslint -p .",
              "test:unit": "nyc mocha",
              "test:watch": "mocha --watch"
            },
            "author": "",
            "license": "ISC",
            "dependencies": {
              "@liftr/core": "0.0.1",
              "dotenv": "^6.2.0",
              "express": "^4.16.4",
              "tsconfig-paths": "^3.6.0",
              "typescript": "^3.2.2"
          },
          "devDependencies": {
            "@types/chai": "^4.1.7",
            "@types/dotenv": "^6.1.0",
            "@types/express": "^4.16.0",
            "@types/mocha": "^5.2.6",
            "@types/sinon": "^7.0.11",
            "@types/sinon-chai": "^3.2.2",
            "chai": "^4.2.0",
            "mocha": "^6.1.2",
            "nodemon": "^1.18.7",
            "nyc": "^13.3.0",
            "sinon": "^7.3.1",
            "sinon-chai": "^3.3.0",
            "ts-node": "^8.0.3"
          }
      }
`;
    writeFile(setupPackageJson, fileContent, (err) => {
      if (err) throw err;
    });
  };
  try {
    await packageJson();
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
      },
    );
  } catch (error) {
    console.error(error);
  }
};
