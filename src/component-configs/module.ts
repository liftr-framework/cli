import { addModule } from '../create';
import { ComponentConfig } from '../types/component-config';
import { controllerContent, moduleContent, routeContent, testControllerContent } from '../component-content';

const config: ComponentConfig = {
  content: moduleContent,
  dependentComponents: [
    {
      componentType: 'controller',
      content: controllerContent,
      testFileContent: testControllerContent,
    },
    {
      componentType: 'route',
      content: routeContent,
    },
  ],
  insertFunction: addModule,
};

module.exports = config;
