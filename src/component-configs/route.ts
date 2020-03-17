import { ComponentConfig } from '../types/component-config';
import { controllerContent, routeContent, testControllerContent } from '../component-content';
import { findModuleAndInsertComponents } from '../create/creation-factory';

const config: ComponentConfig = {
  content: routeContent,
  dependentComponents: [
    {
      componentType: 'controller',
      content: controllerContent,
      testFileContent: testControllerContent,
    },
  ],
  extraQuestions: (moduleList: string[]) => [
    {
      message: 'Which module would you like to insert in',
      name: 'selectedAnswer',
      type: 'list',
      choices: [...moduleList],
    },
  ],
  insertFunction: findModuleAndInsertComponents,
};

module.exports = config;
