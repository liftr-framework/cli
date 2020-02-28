import {QuestionCollection } from 'inquirer';

export const moduleSetupConfig: QuestionCollection = [
  {
    message: 'Name of the component',
    name: 'componentName',
    type: 'input',
  },
];
