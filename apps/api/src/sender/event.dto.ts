import { EventSchema } from '@repo/api/rabit';
import { createZodDto } from 'nestjs-zod';

export class EventDto extends createZodDto(EventSchema) {}
