import { checkLiftrProject } from './helpers';
import { command } from './command';
import { askComponentType } from './questions';
import { components } from './static';

export async function validateCommand(componentType: string): Promise<void> {
  try {
    if (!componentType) {
      const { componentChoice } =  await askComponentType(components);
      componentType = componentChoice;
    }
    if (!components.includes(componentType)) {
      throw Error('This is not a Liftr component, try to running liftr create');
    }
    if (!checkLiftrProject(componentType)) process.exit(1);
    await command(componentType);
  } catch (error) {
    console.error('Something went wrong with validating the command', error);
  }
}
