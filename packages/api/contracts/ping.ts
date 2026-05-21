import { z } from "zod";

export const PingReqSchema = z.object({
  message: z.string().optional(),
});

export const PingResSchema = z.object({
  message: z.string().optional(),
  time: z.string(),
});

export type PingReqType = z.infer<typeof PingReqSchema>;
export type PingResType = z.infer<typeof PingResSchema>;
