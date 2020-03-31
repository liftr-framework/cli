import * as creationFactory from './creation-factory';
import { DependentComponents } from '../types/component-config';

interface CreateDependentComponentsParams {
  componentName: string;
  flatFile: boolean;
  dependentComponents: DependentComponents[];
}

export function createDependentComponents({
  componentName,
  flatFile,
  dependentComponents,
  }: CreateDependentComponentsParams): void {
  for (const component of dependentComponents) {
    creationFactory.createComponent({
      name: componentName,
      content: component.content(componentName, flatFile),
      extension: component.componentType,
      flatFile,
    });
    if (component.testFileContent) {
      creationFactory.createTestFile({
        name: componentName,
        content: component.testFileContent(componentName, flatFile),
        extension: component.componentType,
        flatFile,
      });
    }
  }
}
