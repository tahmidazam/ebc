import z from "zod";

export const encryptedObjectSchema = z.object({
  iv: z.string(),
  authTag: z.string(),
  data: z.string(),
});
export type EncryptedObject = z.infer<typeof encryptedObjectSchema>;
