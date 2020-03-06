import inquirer from 'inquirer';
import { creationFactory } from './create';
import path from 'path';
import glob from 'glob';
import { ComponentConfig, DependentComponents } from './types/component-config';
import { checkLiftrProject } from './helpers';

const components = ['module', 'route', 'middleware', 'controller'];

export async function command(arg: string) {
    // maybe build handle error function based of arguements
    // dont throw error? just end process with log statement
    if (!arg) throw Error('No arguement passed');
    if (!components.includes(arg)) throw Error('This is not an available component. List of available components...');
    if (!checkLiftrProject()) process.exit(1);
    const { componentName, flatFile }: { componentName: string, flatFile: boolean } = await inquirer.prompt([
        {
          message: `Name of the ${arg}`,
          name: 'componentName',
          type: 'input',
        },
        {
          message: `Create a new folder for the ${arg}?`,
          name: 'flatFile',
          type: 'confirm',
        },
    ]);
    const configPath = loadConfig(arg);
    const config: ComponentConfig = require(`./component-configs/${configPath}`);
    const dependentComponents: DependentComponents[] = config.dependentComponents;
    const componentContent = config.content(componentName, flatFile);
    await creationFactory.createComponent({
      name: componentName,
      content: componentContent,
      extension: arg,
      flatFile,
    });
    // The rest of the dependent components
    for (const component of dependentComponents) {
      await creationFactory.createComponent({
        name: componentName,
        content: component.content(componentName, flatFile),
        extension: component.componentType,
        flatFile,
      });
      if (component.testFile) {
        await creationFactory.createTestFile({
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
