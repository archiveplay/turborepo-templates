import { z } from "zod";

export const PingSchema = z.object({
  message: z.string().optional(),
});

export const PingResponseSchema = z.object({
  message: z.string().optional(),
  time: z.date()
});

export type PingRequestBody = z.infer<typeof PingSchema>;
export type PingResponse = z.infer<typeof PingResponseSchema>;
