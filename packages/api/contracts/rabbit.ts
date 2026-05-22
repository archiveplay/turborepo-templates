import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const EventSchema = z.object({
  id: z.uuid(),
  type: z.enum(["create", "read", "update", "delete"]),
  createdAt: z.string(),
  data: z.record(z.string(), z.unknown()),
});

export type EventType = z.infer<typeof EventSchema>;

export function createEvent<T extends Record<string, unknown>>(
  type: EventType["type"],
  data: T,
): EventType {
  const event = {
    id: uuidv4(),
    type,
    createdAt: new Date().toISOString(),
    data,
  };

  return EventSchema.parse(event);
}
