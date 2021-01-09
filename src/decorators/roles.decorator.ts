import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/user.entity';

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
