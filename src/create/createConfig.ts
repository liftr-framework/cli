import fs from 'fs-extra';
import * as path from 'path';
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

/**
 *
 * @export
 * @description This function create the config file tsconfig.json in the specified or default location.
 * @param {string} setupFilepath Contains a file path to where the config needs to be setup, if necessary.
 */
export async function createConfig(setupFilepath: string): Promise<any> {
    const fileContent = null;
    let filepath: string;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
       filepath = process.cwd() + '/tsconfig.json';
    }
    await writeFile(filepath, fileContent);
    await fs.copySync(path.resolve(__dirname, '../templates/tsconfig.json'), filepath);
}
