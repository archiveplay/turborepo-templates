import { z } from "zod";

export const clientSchema = z.object({
  VITE_API_URL: z.url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const env = clientSchema
  // @ts-ignore
  .parse(import.meta.env);
