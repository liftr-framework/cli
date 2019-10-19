import { creation } from '../helpers';
import chalk from 'chalk';
import glob from 'glob';
import { addRouteToFile } from './add-route-to-file';
import { addRouteToModule } from './add-route-to-module';
import { controllerContent, testControllerContent, flatTestControllerContent } from '../component-content';

export async function createComponent(name: string, content: string, extension: string, flatFile: boolean) {
    try {
        const path = flatFile ? `/src/${extension}s` : `/src/${extension}s/${name}`;
        // module should have a path to the route folder instead of creating a  new 'modules' folder
        const specialModulePath = flatFile ? '/src/routes' : `/src/routes/${name}`;
        const checkedPath = extension === 'module' ? specialModulePath : path;
        // route file should have a routes.ts extension - clean up this solution for future releases
        const ext = extension === 'route' ? 'routes' : extension;
        const folderPath = process.cwd() + checkedPath;
        const filePath = process.cwd() + checkedPath + `/${name}.${ext}.ts`;
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr ${extension} named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component', error);
        process.exit(1);
    }
}

export async function createTestFile(name: string, content: string, extension: string, flatFile: boolean) {
    try {
        const path = flatFile ? `/src/${extension}s` : `/src/${extension}s/${name}`;
        const ext = extension === 'route' ? 'routes' : extension;
        const folderPath = process.cwd() + path;
        const filePath = process.cwd() + path + `/${name}.${ext}.spec.ts`;
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr ${extension} spec file named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component', error);
        process.exit(1);
    }
}

export async function findModuleAndInsertComponents(newName: string, targetFileName: string, flatFile: boolean) {
    const modulePath = `/src/routes/**/${targetFileName}.module.ts`;
    const routePath = `/src/routes/**/${targetFileName}.routes.ts`;
    const testControllerComponentContent = flatFile ?
    flatTestControllerContent(newName) : testControllerContent(newName);
    if (targetFileName) {
        glob(process.cwd() +  modulePath, {}, (err, filePaths: string[]) => {
            const path = filePaths[0];
            if (path) {
                addRouteToModule(newName, targetFileName, path);
            }
        });
        glob(process.cwd() +  routePath, {}, (err, filePaths: string[]) => {
            const path = filePaths[0];
            if (path) {
                addRouteToFile(newName, path, flatFile);
                createComponent(newName, controllerContent(newName), 'controller', flatFile);
                createTestFile(newName, testControllerComponentContent, 'controller', flatFile);
            }
        });
    } else throw new Error('Target file not specified');
}
