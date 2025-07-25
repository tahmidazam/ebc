import z from "zod";
import { labelledHrefSchema } from "./labelled-href-schema";

export const collectionSchema = z.object({
  title: z.string(),
  labelledHrefs: z.array(labelledHrefSchema),
});
export type Collection = z.infer<typeof collectionSchema>;
