import { createCipheriv, randomBytes } from "crypto";
import { EncryptedObject } from "./encrypted-object-schema";

export function encryptObject(
  obj: Record<string, unknown>,
  keyHex: string
): EncryptedObject {
  const iv = randomBytes(12);
  const key = Buffer.from(keyHex, "hex");

  if (key.length !== 32)
    throw new Error("Key must be 32 bytes (64 hex characters)");

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const json = JSON.stringify(obj);

  const encrypted = Buffer.concat([
    cipher.update(json, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  const payload = {
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    data: encrypted.toString("hex"),
  };

  return payload;
}
