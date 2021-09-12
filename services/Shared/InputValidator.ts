import { Space } from './Model';

export class MissingFieldError extends Error {}

export function validateAsSpaceEntry(arg: any): void {
  if (!('spaceId' in arg)) {
    throw new MissingFieldError('Value for location required');
  }

  if (!('name' in arg)) {
    throw new MissingFieldError('Value for name required');
  }

  if (!('location' in arg)) {
    throw new MissingFieldError('Value for location required');
  }
}
