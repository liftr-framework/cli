import inquirer from 'inquirer';
import chalk from 'chalk';
import { ComponentConfig } from './types/component-config';
import { getModuleFiles } from './helpers';

function sanitizeComponentName(name: string) {
  return name.split('').filter((split) => split !== '-').join('');
}

export async function askRequiredQuestions(componentType: string): Promise<inquirer.Answers> {
  return await inquirer.prompt([
    {
      message: `Name of the ${componentType}`,
      name: 'componentName',
      type: 'input',
      filter: (input) => sanitizeComponentName(input),
    },
    {
      message: `Create a new folder for the ${componentType} and its dependent components?`,
      name: 'createFolder',
      type: 'confirm',
    },
  ]);
}

export async function askSetupQuestions(): Promise<inquirer.Answers> {
  return await inquirer.prompt([
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
}

export async function askComponentType(possibleComponents: string[]): Promise<inquirer.Answers> {
  return await inquirer.prompt([
    {
      message: 'What Liftr component would you like to create?',
      name: 'componentChoice',
      type: 'list',
      choices: possibleComponents,
    },
]);
}

interface ExtraQuestionsAndInsertParams {
  componentName: string;
  flatFile: boolean;
}

export async function extraQuestionsAndInsertFunction(
  config: ComponentConfig,
  { componentName, flatFile }: ExtraQuestionsAndInsertParams): Promise<void> {
  let endpointMethod: any;
  let selectedFile: any;
  if (config.extraQuestions) {
    // necessary for chosing which module to insert into
    const moduleFiles = await getModuleFiles();
    const questions = config.extraQuestions(moduleFiles);
    const { selectedAnswerOne, selectedAnswerTwo } = await inquirer.prompt(questions);
    endpointMethod = selectedAnswerOne;
    selectedFile = selectedAnswerTwo;
  }

  if (config.insertFunction) config.insertFunction(componentName, flatFile, selectedFile, endpointMethod);
}
