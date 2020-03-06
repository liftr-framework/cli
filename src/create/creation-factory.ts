import { creation } from '../helpers';
import path from 'path';
import chalk from 'chalk';
import glob from 'glob';
import { addRouteToFile } from './add-route-to-file';
import { addRouteToModule } from './add-route-to-module';
import { controllerContent, testControllerContent } from '../component-content';

interface CreateParameters {
  name: string;
  content: string;
  extension: string;
  flatFile: boolean;
}

export async function createComponent({name, content, extension, flatFile}: CreateParameters) {
    try {
        const rawPath = flatFile ? `/src/${extension}s` : `/src/${extension}s/${name}`;
        // module should have a path to the route folder instead of creating a  new 'modules' folder
        const specialModulePath = flatFile ? '/src/routes' : `/src/routes/${name}`;
        const checkedPath = extension === 'module' ? specialModulePath : rawPath;
        // route file should have a routes.ts extension - clean up this solution for future releases
        const ext = extension === 'route' ? 'routes' : extension;
        const folderPath = path.join(process.cwd(), checkedPath);
        const filePath = path.join(process.cwd(), checkedPath, `/${name}.${ext}.ts`);
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr ${extension} named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component', error);
        process.exit(1);
    }
}

export async function createTestFile({name, content, extension, flatFile}: CreateParameters) {
    try {
        const rawPath = flatFile ? `/src/${extension}s` : `/src/${extension}s/${name}`;
        const ext = extension === 'route' ? 'routes' : extension;
        const folderPath = path.join(process.cwd(), rawPath);
        const filePath = path.join(process.cwd(), rawPath, `/${name}.${ext}.spec.ts`);
        await creation(folderPath, filePath, content);
        console.log(chalk.green(`Liftr ${extension} spec file named ${name} created`));
    } catch (error) {
        console.error('An error has occured with creating the Liftr component spec file', error);
        process.exit(1);
    }
}

export function findModuleAndInsertComponents(name: string, flatFile: boolean, targetModuleName?: string): void {
    const modulePath = `/src/routes/**/${targetModuleName}.module.ts`;
    const routePath = `/src/routes/**/${targetModuleName}.routes.ts`;
    const content = testControllerContent(name, flatFile);
    if (targetModuleName) {
        glob(process.cwd() +  modulePath, {}, (err, filePaths: string[]) => {
            const filePath = filePaths[0];
            if (path) {
                addRouteToModule(name, targetModuleName, filePath);
            }
        });
        glob(process.cwd() +  routePath, {}, (err, filePaths: string[]) => {
            const filePath = filePaths[0];
            if (path) {
                addRouteToFile(name, filePath, flatFile);
                createComponent({
                  name,
                  content: controllerContent(name, flatFile),
                  extension: 'controller',
                  flatFile,
                });
                createTestFile({
                  name,
                  content,
                  extension: 'controller',
                  flatFile,
                });
            }
        });
    } else throw new Error('Target file not specified');
}
