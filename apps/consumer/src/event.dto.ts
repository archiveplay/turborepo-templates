import { EventSchema } from '@repo/api/rabbit';
import { createZodDto } from 'nestjs-zod';

export class EventDto extends createZodDto(EventSchema) {}
