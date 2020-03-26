import * as creationFactory from './creation-factory';
import { ComponentConfig } from '../types/component-config';

interface CreateMainComponentParams {
  componentName: string;
  config: ComponentConfig;
  componentType: string;
  flatFile: boolean;
}

export function createMainComponent({componentName, config, componentType, flatFile}: CreateMainComponentParams): void {
  const componentContent: string = config.content(componentName, flatFile);
  creationFactory.createComponent({
    name: componentName,
    content: componentContent,
    extension: componentType,
    flatFile,
  });
  if (config.testFileContent) {
    creationFactory.createTestFile({
      name: componentName,
      content: config.testFileContent(componentName, flatFile),
      extension: componentType,
      flatFile,
    });
  }
}
