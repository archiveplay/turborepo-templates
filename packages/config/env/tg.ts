import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const TgSchema = z.object({
  TG_BOT_TOKEN: z.string(),
  TG_CHAT_ID: z.string(),
});

export const env = TgSchema.parse(process.env);
