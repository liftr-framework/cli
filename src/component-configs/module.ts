import { addModule } from '../create';
import { ComponentConfig } from '../types/component-config';
import { controllerContent, moduleContent, routeContent } from '../component-content';

const config: ComponentConfig = {
  content: moduleContent,
  dependentComponents: [
    {
      componentType: 'controller',
      content: controllerContent,
      testFile: true,
    },
    {
      componentType: 'route',
      content: routeContent,
      testFile: true,
    },
  ],
  insertFunction: addModule,
  testFile: true,
};

module.exports = config;
