import fs from 'fs-extra'
import { Spinner } from '../types/spinner.type'
import chalk from 'chalk'
const { exec } = require('child_process')

export const dependencies = async (setupName: string, spinner: Spinner) => {
  const setupPackageJson = process.cwd() + `/${setupName}/package.json`

  const packageJson: () => void = () => {
    const fileContent = `
        {
            "name": "${setupName}",
            "version": "1.0.0",
            "description": "A project setup with liftr",
            "main": "server.js",
            "scripts": {
              "start": "ts-node -r tsconfig-paths/register src/server.ts",
              "build": "tsc -p ."
            },
            "author": "",
            "license": "ISC",
            "dependencies": {
              "dotenv": "^6.2.0",
              "express": "^4.16.4",
              "tsconfig-paths": "^3.6.0",
              "typescript": "^3.2.2"
          },
          "devDependencies": {
            "@types/dotenv": "^6.1.0",
            "@types/express": "^4.16.0",
            "nodemon": "^1.18.7"
          }
      }
`
    fs.writeFile(setupPackageJson, fileContent, err => {
      if (err) throw err
    })
  }
  try {
    await packageJson()
    await exec(
      `cd ${setupName} && npm install `,
      (error: Error, stdout: string, stderr: string) => {
        if (error) {
          console.log(error)
          return
        }
        spinner.succeed(chalk.green(`Liftr is ready! cd into ${setupName} and run npm start.`))
        spinner.info(
          chalk.blue(
            `Make sure you have installed ts-node and typscript installed on your machine.`,
          ),
        )
        spinner.warn(chalk.yellow(`If not run: "npm i -g ts-node typescript".`))
      },
    )
  } catch (error) {
    console.error(error)
  }
}
