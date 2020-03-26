import { createSetup } from './create';
import { ComponentConfig, DependentComponents } from './types/component-config';
import { checkLiftrProject, loadConfig, getModuleFiles } from './helpers';
import chalk from 'chalk';
import { createDependentComponents } from './create/create-dependent-components';
import { createMainComponent } from './create/create-main-component';
import inquirer from 'inquirer';
import { askRequiredQuestions, askSetupQuestions } from './questions';

const components = ['module', 'route', 'middleware', 'controller', 'setup'];

export async function command(componentType: string) {
  try {
    // maybe build handle error function based of arguements
    // dont throw error? just end process with log statement
    if (!componentType) throw Error('No arguement passed');
    if (!components.includes(componentType)) {
      throw Error('This is not an available component');
    }
    if (!checkLiftrProject()) process.exit(1);
    if (componentType === 'setup') {
      const { projectName }: inquirer.Answers = askSetupQuestions();
      return await createSetup(projectName);
    }
    const configPath = loadConfig(componentType);

    // load the components config based in ./component-configs
    const config: ComponentConfig = require(`./component-configs/${configPath}`);
    const { componentName, flatFile }: inquirer.Answers = await askRequiredQuestions(componentType);

    let selectedFile: any;
    if (config.extraQuestions) {
      const moduleFiles = await getModuleFiles();
      const questions = config.extraQuestions(moduleFiles);
      const { selectedAnswer } = await inquirer.prompt(questions);
      selectedFile = selectedAnswer;
    }

    // routes can only be "inserted", to create a new routes file you need to create a module
    if (componentType !== 'route') {
      createMainComponent({ componentName, config, componentType, flatFile });
    }

    if (config.insertFunction) config.insertFunction(componentName, flatFile, selectedFile);
    // Create the dependent components
    const dependentComponents: DependentComponents[] = config.dependentComponents;
    createDependentComponents({ componentName, flatFile, dependentComponents });
  } catch (error) {
    console.error('An error occured with creating a component', error);
  }
}
