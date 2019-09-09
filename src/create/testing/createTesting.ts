import { writeFile, copySync } from 'fs-extra';
import { resolve } from 'path';

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
        await writeFile(createPath, fileContent, (err) => {
            // if (err) console.error('Cant create files');
        });
        if (createPath.includes('mocha.opts')) {
            await copySync(resolve(__dirname, '../../templates/mocha.opts'), createPath);
        }
        if (createPath.includes('.nycrc')) {
            await copySync(resolve(__dirname, '../../templates/.nycrc'), createPath);
        }
        if (createPath.includes('mocha.require.ts')) {
            await copySync(resolve(__dirname, '../../templates/mocha.require.ts'), createPath);
        }
    });
};
