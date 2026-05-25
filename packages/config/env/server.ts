import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
});

export const env = serverSchema.parse(process.env);
