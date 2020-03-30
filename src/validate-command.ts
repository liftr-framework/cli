import { checkLiftrProject } from './helpers';
import { command } from './command';
import { askComponentType } from './questions';
import { components } from './static';

export async function validateCommand(componentType: string): Promise<void> {
  if (!componentType) {
    const { componentChoice } =  await askComponentType(components);
    componentType = componentChoice;
  }
  if (!checkLiftrProject(componentType)) process.exit(1);
  await command(componentType);
}
