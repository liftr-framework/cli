import { ComponentConfig } from '../types/component-config';
import { middleWareContent, testMiddleWareContent } from '../component-content';

const config: ComponentConfig = {
  content: middleWareContent,
  testFileContent: testMiddleWareContent,
  dependentComponents: [],
};

module.exports = config;
