import { z } from "zod";

export const UserReqSchema = z.object({
  id: z.number().int(),
});

export const UserResSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  name: z.string().nullable().optional(),
});

export const UsersResSchema = z.array(UserResSchema);

export type UserResType = z.infer<typeof UserResSchema>;
export type UsersResType = z.infer<typeof UsersResSchema>;
export type UserReqType = z.infer<typeof UserReqSchema>;
