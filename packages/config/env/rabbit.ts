import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const RabbitSchema = z.object({
  RABBIT_URL: z.url(),
});

export const env = RabbitSchema.parse(process.env);
