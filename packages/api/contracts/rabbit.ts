import { z } from "zod";

export const EventSchema = z.object({
  type: z.enum(["create", "read", "update", "delete"]),
  data: z.record(z.string(), z.any()),
});

export type EventType = z.infer<typeof EventSchema>;
