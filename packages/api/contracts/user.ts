import { z } from "zod";

export const UserReqSchema = z.object({
  id: z.number().int(),
});

export const UserResSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  name: z.string().nullable().optional(),
});

export type UserResType = z.infer<typeof UserResSchema>;
export type UserReqType = z.infer<typeof UserReqSchema>;


