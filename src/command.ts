import { createSetup } from './create';
import { ComponentConfig, DependentComponents } from './types/component-config';
import { loadConfig } from './helpers';
import { createDependentComponents } from './create/create-dependent-components';
import { createMainComponent } from './create/create-main-component';
import inquirer from 'inquirer';
import { askRequiredQuestions,
  askSetupQuestions,
  extraQuestionsAndInsertFunction,
} from './questions';

export async function command(componentType: string) {
  try {
    if (componentType === 'setup') {
      const { projectName }: inquirer.Answers = await askSetupQuestions();
      return await createSetup(projectName);
    }
    const configPath = loadConfig(componentType);

    // load the components config based in ./component-configs
    const config: ComponentConfig = require(`./component-configs/${configPath}`);
    const { componentName, createFolder }: inquirer.Answers = await askRequiredQuestions(componentType);
    const dependentComponents: DependentComponents[] = config.dependentComponents;
    const flatFile: boolean = !createFolder;

    await extraQuestionsAndInsertFunction(config, {componentName, flatFile});
    // routes can only be "inserted", to create a new routes file you need to create a module
    if (componentType !== 'route') {
      createMainComponent({ componentName, config, componentType, flatFile });
    }

    // Create the dependent components
    createDependentComponents({ componentName, flatFile, dependentComponents });
  } catch (error) {
    console.error('An error occured with creating a component', error);
  }
}
