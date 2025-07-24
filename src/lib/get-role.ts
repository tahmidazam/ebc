"use server";

import { decryptObject } from "@/lib/decrypt-object";
import { encryptedObjectSchema } from "@/lib/encrypted-object-schema";
import { verifyAccessCode } from "@/lib/verify-access-code";
import { cookies } from "next/headers";
import z from "zod";
import { Role } from "./role-schema";

export async function getRole(): Promise<Role | undefined> {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) return undefined;

  const serialisedEncryptedCode = (await cookies()).get("code")?.value;
  if (!serialisedEncryptedCode) return undefined;

  try {
    const encryptedCode = encryptedObjectSchema.parse(
      JSON.parse(serialisedEncryptedCode)
    );

    const { code } = z
      .object({ code: z.string() })
      .parse(decryptObject(encryptedCode, secretKey));

    const role = verifyAccessCode(code, secretKey, true)!;
    return role;
  } catch {
    return undefined;
  }
}
