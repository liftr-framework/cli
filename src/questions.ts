import inquirer from 'inquirer';
import chalk from 'chalk';

export async function askRequiredQuestions(componentType: string): Promise<inquirer.Answers> {
  return await inquirer.prompt([
    {
      message: `Name of the ${componentType}`,
      name: 'componentName',
      type: 'input',
    },
    {
      message: `Create a new folder for the ${componentType} and its dependent components?`,
      name: 'flatFile',
      type: 'confirm',
      filter: (input) => {
        return !input;
      },
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
