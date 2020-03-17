import { QuestionCollection } from 'inquirer';

export interface ComponentConfig {
  content: (name: string, flat: boolean) => string;
  dependentComponents: DependentComponents[];
  testFileContent?: (name: string, flat: boolean) => string;
  extraQuestions?: (params: any) => QuestionCollection;
  insertFunction?(name: string, flat: boolean): any;
  insertFunction?(name: string, flat: boolean, targetName?: string): void;
}

export interface DependentComponents {
  componentType: string;
  content: (name: string, flat: boolean) => string;
  testFileContent?: (name: string, flat: boolean) => string;
}
