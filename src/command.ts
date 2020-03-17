import inquirer, { Answers } from 'inquirer';
import { creationFactory } from './create';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import { ComponentConfig, DependentComponents } from './types/component-config';
import { checkLiftrProject } from './helpers';

const components = ['module', 'route', 'middleware', 'controller'];

export async function command(componentType: string) {
  try {
    // maybe build handle error function based of arguements
    // dont throw error? just end process with log statement
    if (!componentType) throw Error('No arguement passed');
    if (!components.includes(componentType)) {
      throw Error('This is not an available component. List of available components...');
    }
    if (!checkLiftrProject()) process.exit(1);
    const configPath = loadConfig(componentType);
    const moduleFiles = await getModuleFiles();
    const config: ComponentConfig = require(`./component-configs/${configPath}`);
    const { componentName, createFolder }: inquirer.Answers = await inquirer.prompt([
        {
          message: `Name of the ${componentType}`,
          name: 'componentName',
          type: 'input',
        },
        {
          message: `Create a new folder for the ${componentType}?`,
          name: 'createFolder',
          type: 'confirm',
        },
    ]);
    let selectedFile: any;
    if (config.extraQuestions) {
      const questions = config.extraQuestions(moduleFiles);
      const { selectedAnswer } = await inquirer.prompt(questions);
      selectedFile = selectedAnswer;
    }
    const flatFile: boolean = !createFolder;
    const dependentComponents: DependentComponents[] = config.dependentComponents;
    const componentContent: string = config.content(componentName, flatFile);
    creationFactory.createComponent({
      name: componentName,
      content: componentContent,
      extension: componentType,
      flatFile,
    });
    // insert the main component
    if (config.insertFunction) config.insertFunction(componentName, flatFile, selectedFile);
    // The rest of the dependent components
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
  } catch (error) {
    console.error('An error occured with creating a component', error);
  }
}

function loadConfig(componentType: string) {
  return glob.sync(`${componentType}.?s`, {
    cwd: path.resolve(`${__dirname}/component-configs`),
  });
}

async function getModuleFiles() {
  const sourceFolder = path.join(process.cwd(), '/src/routes/');
  const files = await fs.readdir(sourceFolder);
  const moduleFiles = files.filter((name: string) => name.includes('.module'))
    .map((module) => module.replace('.module.ts', ''));

  return moduleFiles;
}
