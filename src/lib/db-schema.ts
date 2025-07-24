import z from "zod";
import { collectionSchema } from "./collection-schema";

export const dbSchema = z.object({
  collections: z.array(collectionSchema),
  roles: z.record(
    z.string(),
    z.object({
      title: z.string(),
      collections: z.array(z.string()),
    })
  ),
});
export type Db = z.infer<typeof dbSchema>;
