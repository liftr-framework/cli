import { ComponentConfig } from '../types/component-config';
import { routeContent } from '../component-content';
import { findModuleAndInsertComponents } from '../create/creation-factory';

const config: ComponentConfig = {
  content: routeContent,
  dependentComponents: [
  ],
  extraQuestions: (moduleList: string[]) => [
    {
      message: 'What type of route do you want to create?',
      name: 'selectedAnswerOne',
      type: 'list',
      choices: ['get', 'post', 'patch', 'delete', 'put'],
    },
    {
      message: 'Which module would you like to insert in',
      name: 'selectedAnswerTwo',
      type: 'list',
      choices: [...moduleList],
    },
  ],
  insertFunction: findModuleAndInsertComponents,
};

module.exports = config;
