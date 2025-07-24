import { createDecipheriv } from "crypto";
import { NextResponse } from "next/server";
import encryptedDb from "@/../public/db.json";
import z from "zod";
import { roleSchema } from "@/lib/role";
import { collectionSchema } from "@/lib/collection";

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
  ): Record<string, unknown> {
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

    return JSON.parse(decrypted.toString("utf8")) as Record<string, unknown>;
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

    const dbSchema = z.object({
      collections: z.array(collectionSchema),
      roles: z.record(
        z.string(),
        z.object({
          title: z.string(),
          collections: z.array(z.string()),
        })
      ),
    });
    const parsedDb = dbSchema.safeParse(db);

    if (!parsedDb.success) {
      return NextResponse.json(
        { success: false, error: "Invalid database structure" },
        { status: 500 }
      );
    }

    if (!Object.keys(parsedDb.data.roles).includes(parsedCode.data)) {
      return NextResponse.json(
        { success: false, error: "Invalid access code" },
        { status: 404 }
      );
    }

    const role = parsedDb.data.roles[parsedCode.data];

    const collections = parsedDb.data.collections.filter(
      (collection: { title: string }) =>
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );
  }
}
