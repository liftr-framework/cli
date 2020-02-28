import inquirer from 'inquirer';

const enum ComponentList {
  module = 'module',
  route = 'route',
  middleware = 'middleware',
  controller = 'controller',
}

export async function command(arg: string) {
    if (!arg) throw Error('No arguement passed');
    const { componentName, flat }: { componentName: ComponentList, flat: boolean } = await inquirer.prompt([
        {
          message: 'Name of the component',
          name: 'componentName',
          type: 'input',
        },
        {
          message: 'Create a new folder?',
          name: 'flat',
          type: 'confirm',
        },
    ]);

}
