import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const TgSchema = z.object({
  TG_BOT_TOKEN: z.url(),
});

export const env = TgSchema.parse(process.env);
