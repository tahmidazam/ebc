import { createDecipheriv } from "crypto";
import { NextResponse } from "next/server";
import encryptedDb from "@/../public/db.json";
import z from "zod";
import { roleSchema } from "@/lib/role";

const codeSchema = z
  .string()
  .regex(new RegExp("^\\d+$"), "Invalid code format");

export async function POST(req: Request) {
  function decryptObject(
    encrypted: {
      iv: string;
      authTag: string;
      data: string;
    },
    keyHex: string
  ): Record<string, any> {
    const key = Buffer.from(keyHex, "hex");

    if (key.length !== 32) {
      throw new Error("Key must be 32 bytes (64 hex characters)");
    }

    const iv = Buffer.from(encrypted.iv, "hex");
    const authTag = Buffer.from(encrypted.authTag, "hex");
    const data = Buffer.from(encrypted.data, "hex");
    const decipher = createDecipheriv("aes-256-gcm", key, iv);

    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);

    return JSON.parse(decrypted.toString("utf8"));
  }

  const { code } = await req.json();

  const parsedCode = codeSchema.safeParse(code);

  if (!parsedCode.success) {
    return NextResponse.json(
      { success: false, error: "Invalid code format" },
      { status: 400 }
    );
  }

  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const db = decryptObject(encryptedDb, secretKey);

    const role = db.roles[parsedCode.data];

    if (!role) {
      return NextResponse.json(
        { success: false, error: "Invalid access code" },
        { status: 404 }
      );
    }

    const collections = db.collections.filter((collection: { title: string }) =>
      role.collections.includes(collection.title)
    );

    const result = {
      title: role.title,
      collections: collections,
    };

    const parsedResult = roleSchema.safeParse(result);

    if (!parsedResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid role data" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }
}
