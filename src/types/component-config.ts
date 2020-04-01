import { QuestionCollection } from 'inquirer';

export interface ComponentConfig {
  dependentComponents: DependentComponents[];
  content(name: string, flat: boolean): string;
  extraQuestions?(params: any): QuestionCollection;
  insertFunction?(name: string, flat: boolean): any;
  insertFunction?(name: string, flat: boolean, targetName?: string, endpointType?: string): void;
  testFileContent?(name: string, flat: boolean): string;
}

export interface DependentComponents {
  componentType: string;
  content(name: string, flat: boolean): string;
  testFileContent?(name: string, flat: boolean): string;
}
