import { ComponentConfig } from '../types/component-config';
import { controllerContent, testControllerContent } from '../component-content';

const config: ComponentConfig = {
  content: controllerContent,
  testFileContent: testControllerContent,
  dependentComponents: [],
};

module.exports = config;
