export interface ComponentConfig {
  content: (name: string, flat: boolean) => string;
  dependentComponents: DependentComponents[];
  testFile: boolean;
  insertFunction: (name: string, flat: boolean) => Promise<void>;
}

export interface DependentComponents {
  componentType: string;
  content: (name: string, flat: boolean) => string;
  testFile: boolean;
}
