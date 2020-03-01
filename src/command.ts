import inquirer from 'inquirer';
import { creationFactory } from './create';

const components = ['module', 'route', 'middleware', 'controller'];

export async function command(arg: string) {
    // maybe build handle error function based of arguements
    // dont throw error? just end process with log statement
    if (!arg) throw Error('No arguement passed');
    if (!components.includes(arg)) throw Error('This is not an available component. List of available components...');
    const { componentName, flat }: { componentName: string, flat: boolean } = await inquirer.prompt([
        {
          message: `Name of the ${arg}`,
          name: 'componentName',
          type: 'input',
        },
        {
          message: `Create a new folder for the ${arg}?`,
          name: 'flat',
          type: 'confirm',
        },
    ]);
}

const moduleConfig = {
  componentsAdded: ['route', 'controller'],
  content: 'someContent',
  testFile: true,
};

function loadConfig(componentType: string, name: string, flatFile: boolean) {
  const configComponents = moduleConfig.componentsAdded;
  const content = moduleConfig.content;
  creationFactory.createComponent(name, content, componentType, flatFile);
}
