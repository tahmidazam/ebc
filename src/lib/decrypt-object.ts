import { createDecipheriv } from "crypto";
import { EncryptedObject } from "./encrypted-object-schema";

export function decryptObject(
  encrypted: EncryptedObject,
  keyHex: string
): Record<string, unknown> {
  const key = Buffer.from(keyHex, "hex");

  if (key.length !== 32)
    throw new Error("Key must be 32 bytes (64 hex characters)");

  const iv = Buffer.from(encrypted.iv, "hex");
  const authTag = Buffer.from(encrypted.authTag, "hex");
  const data = Buffer.from(encrypted.data, "hex");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

  return JSON.parse(decrypted.toString("utf8")) as Record<string, unknown>;
}
