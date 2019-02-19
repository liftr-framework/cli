import fs from 'fs-extra';
import * as path from 'path';

export const createConfig = (setupFilepath: string) => {
    const fileContent = null;
    let filepath;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
       filepath = process.cwd() + '/tsconfig.json';
    }
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
    });
    fs.copySync(path.resolve(__dirname, '../templates/tsconfig.json'), filepath);
};
