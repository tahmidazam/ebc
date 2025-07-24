import { codeSchema } from "./code-schema";
import { dbSchema } from "./db-schema";
import { decryptObject } from "./decrypt-object";
import encryptedDb from "@/../public/db.json";
import { UnauthorisedAccessCodeError } from "./unauthorised-access-code-error";
import { Role } from "./role-schema";

export function verifyAccessCode(
  code: string,
  key: string,
  returnRole: boolean = false
): Role | undefined {
  const parsedCode = codeSchema.parse(code);
  const db = decryptObject(encryptedDb, key);
  const parsedDb = dbSchema.parse(db);
  const validCodes = Object.keys(parsedDb.roles);
  const isValidCode = validCodes.includes(parsedCode);

  if (!isValidCode) {
    throw new UnauthorisedAccessCodeError();
  }

  if (returnRole) {
    const role = parsedDb.roles[parsedCode];
    const collections = parsedDb.collections.filter((collection) =>
      role.collections.includes(collection.title)
    );
    return { title: role.title, collections };
  }

  return undefined;
}
