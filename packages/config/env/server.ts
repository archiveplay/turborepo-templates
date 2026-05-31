import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

export const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),

  REDIS_URL: z.string().default("redis://localhost:6379"),
  CACHE_TTL: z.coerce.number().default(60),
});

export const env = serverSchema.parse(process.env);
