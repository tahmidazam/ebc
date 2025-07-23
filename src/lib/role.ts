import z from "zod";
import { collectionSchema } from "./collection";

export const roleSchema = z.object({
  title: z.string(),
  collections: z.array(collectionSchema),
});
export type Role = z.infer<typeof roleSchema>;
