import { SetMetadata } from '@nestjs/common';

export const Uids = (...args: number[]) => SetMetadata('uids', args);
