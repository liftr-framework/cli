import fs from 'fs-extra';
import * as path from 'path';

export const createTesting = async (setupName: string) => {
    const fileContent = null;
    const mochaSetup: string = process.cwd() + `/${setupName}/test/mocha.opts`;
    const nycSetup: string = process.cwd() + `/${setupName}/.nycrc`;
    const mochaRequire: string = process.cwd() + `/${setupName}/test/mocha.require.ts`;

    const testingFiles: string[] = [
        mochaSetup,
        nycSetup,
        mochaRequire,
    ];
    await testingFiles.forEach(async (createPath) => {
        await fs.writeFile(createPath, fileContent, (err) => {
            // if (err) console.error('Cant create files');
        });
        if (createPath.includes('mocha.opts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/mocha.opts'), createPath);
        }
        if (createPath.includes('.nycrc')) {
            await fs.copySync(path.resolve(__dirname, '../templates/.nycrc'), createPath);
        }
        if (createPath.includes('mocha.require.ts')) {
            await fs.copySync(path.resolve(__dirname, '../templates/mocha.require.ts'), createPath);
        }
    });
};
