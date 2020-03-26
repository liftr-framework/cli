import inquirer from 'inquirer';
import { creationFactory, createSetup } from './create';
import { ComponentConfig, DependentComponents } from './types/component-config';
import { checkLiftrProject, loadConfig, getModuleFiles } from './helpers';
import chalk from 'chalk';

const components = ['module', 'route', 'middleware', 'controller', 'setup'];

export async function command(componentType: string) {
  try {
    // maybe build handle error function based of arguements
    // dont throw error? just end process with log statement
    if (!componentType) throw Error('No arguement passed');
    if (!components.includes(componentType)) {
      throw Error('This is not an available component. List of available components...');
    }
    if (!checkLiftrProject()) process.exit(1);
    if (componentType === 'setup') {
      const { projectName }: inquirer.Answers = await inquirer.prompt([
        {
          message: 'Name of the project',
          name: 'projectName',
          type: 'input',
          validate: (input) => {
            if (!input) {
              console.error(chalk.yellow('Every great project needs a name'));
              return false;
            }
            return true;
          },
        },
    ]);
      return await createSetup(projectName);
    }
    const configPath = loadConfig(componentType);
    const moduleFiles = await getModuleFiles();
    const config: ComponentConfig = require(`./component-configs/${configPath}`);
    const { componentName, createFolder }: inquirer.Answers = await inquirer.prompt([
        {
          message: `Name of the ${componentType}`,
          name: 'componentName',
          type: 'input',
        },
        {
          message: `Create a new folder for the ${componentType} and its dependent components?`,
          name: 'createFolder',
          type: 'confirm',
        },
    ]);

    let selectedFile: any;
    if (config.extraQuestions) {
      const questions = config.extraQuestions(moduleFiles);
      const { selectedAnswer } = await inquirer.prompt(questions);
      selectedFile = selectedAnswer;
    }
    const flatFile: boolean = !createFolder;
    const dependentComponents: DependentComponents[] = config.dependentComponents;
    const componentContent: string = config.content(componentName, flatFile);

    // routes can only be "inserted", to create a new routes file you need to create a module
    if (componentType !== 'route') {
      creationFactory.createComponent({
        name: componentName,
        content: componentContent,
        extension: componentType,
        flatFile,
      });
      if (config.testFileContent) {
        creationFactory.createTestFile({
          name: componentName,
          content: config.testFileContent(componentName, flatFile),
          extension: componentType,
          flatFile,
        });
      }
    }
    // insert the main component
    if (config.insertFunction) config.insertFunction(componentName, flatFile, selectedFile);
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
          content: component.testFileContent(componentName, flatFile),
          extension: component.componentType,
          flatFile,
        });
      }
    }
  } catch (error) {
    console.error('An error occured with creating a component', error);
  }
}
