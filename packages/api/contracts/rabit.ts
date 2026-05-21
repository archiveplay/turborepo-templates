import { z } from "zod";

export const EventSchema = z.object({
  type: z.enum(["create", "read", "update", "delete"]),
  data: z.object(),
});

export type EventType = z.infer<typeof EventSchema>;
