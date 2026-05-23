import { createZodDto } from 'nestjs-zod';
import { UserResSchema, UsersResSchema } from '@repo/api/user';

export class UsersResDto extends createZodDto(UsersResSchema) {}
export class UserResDto extends createZodDto(UserResSchema) {}
