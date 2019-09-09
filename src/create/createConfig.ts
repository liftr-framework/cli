import { copySync, writeFile } from 'fs-extra';
import { resolve } from 'path';
const { promisify } = require('util');
const writeFilePromisify = promisify(writeFile);

export const createConfig = async (setupFilepath: string) => {
    const fileContent = null;
    let filepath: string;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
       filepath = process.cwd() + '/tsconfig.json';
    }
    await writeFilePromisify(filepath, fileContent);
    await copySync(resolve(__dirname, '../templates/tsconfig.json'), filepath);
};
