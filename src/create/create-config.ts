import { copy, writeFile } from 'fs-extra';
import { resolve } from 'path';

export const createConfig = async (setupFilepath: string): Promise<void> => {
    const fileContent = null;
    let filepath: string;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
       filepath = process.cwd() + '/tsconfig.json';
    }
    await writeFile(filepath, fileContent);
    await copy(resolve(__dirname, '../templates/tsconfig.json'), filepath);
};
