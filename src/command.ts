import inquirer from 'inquirer';
import { creationFactory } from './create';
import path from 'path';
import glob from 'glob';
import { ComponentConfig, DependentComponents } from './types/component-config';
import { checkLiftrProject } from './helpers';

const components = ['module', 'route', 'middleware', 'controller'];

export async function command(componentType: string) {
    // maybe build handle error function based of arguements
    // dont throw error? just end process with log statement
    if (!componentType) throw Error('No arguement passed');
    if (!components.includes(componentType)) {
      throw Error('This is not an available component. List of available components...');
    }
    if (!checkLiftrProject()) process.exit(1);
    const { componentName, createFolder }: { componentName: string, createFolder: boolean } = await inquirer.prompt([
        {
          message: `Name of the ${componentType}`,
          name: 'componentName',
          type: 'input',
        },
        {
          message: `Create a new folder for the ${componentType}?`,
          name: 'createFolder',
          type: 'confirm',
        },
    ]);
    const flatFile: boolean = !createFolder;
    const configPath = loadConfig(componentType);
    const config: ComponentConfig = require(`./component-configs/${configPath}`);
    const dependentComponents: DependentComponents[] = config.dependentComponents;
    const componentContent: string = config.content(componentName, flatFile);
    creationFactory.createComponent({
      name: componentName,
      content: componentContent,
      extension: componentType,
      flatFile,
    });
    // insert the main component
    if (config.insertFunction) config.insertFunction(componentName, flatFile);
    // The rest of the dependent components
    for (const component of dependentComponents) {
      creationFactory.createComponent({
        name: componentName,
        content: component.content(componentName, flatFile),
        extension: component.componentType,
        flatFile,
      });
      if (component.testFileContent) {
        creationFactory.createTestFile({
          name: componentName,
          content: component.content(componentName, flatFile),
          extension: component.componentType,
          flatFile,
        });
      }
    }
}

function loadConfig(componentType: string) {
  return glob.sync(`${componentType}.?s`, {
    cwd: path.resolve(`${__dirname}/component-configs`),
  });
}
