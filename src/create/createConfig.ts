import fs from 'fs-extra';
import * as path from 'path';
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)


export const createConfig = async (setupFilepath: string) => {
    const fileContent = null;
    let filepath: string;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
       filepath = process.cwd() + '/tsconfig.json';
    }
    await writeFile(filepath, fileContent);
    await fs.copySync(path.resolve(__dirname, '../templates/tsconfig.json'), filepath);
};
