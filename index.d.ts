import { v4 as uuidv4 } from 'uuid/v4';

export function randomId(): string {
  return uuidv4();
}
