import z from "zod";

export const labelledHrefSchema = z.object({
  href: z.string(),
  label: z.string(),
});
export type LabelledHref = z.infer<typeof labelledHrefSchema>;
