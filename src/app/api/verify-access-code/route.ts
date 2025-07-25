import { encryptObject } from "@/lib/encrypt-object";
import { UnauthorisedAccessCodeError } from "@/lib/unauthorised-access-code-error";
import { verifyAccessCode } from "@/lib/verify-access-code";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Obtain the secret key from environment variables:
  const secretKey = process.env.SECRET_KEY;

  // Return an error if the secret key is not set:
  if (!secretKey)
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 }
    );

  // Obtain the code from the request:
  const { code } = await req.json();

  try {
    // Validate the code:
    verifyAccessCode(code, secretKey);

    const encryptedCode = encryptObject(
      {
        code: code,
      },
      secretKey
    );
    const serialisedEncryptedCode = JSON.stringify(encryptedCode);

    // Set the encrypted code in a cookie:
    (await cookies()).set({
      name: "code",
      value: serialisedEncryptedCode,
      maxAge: 60 * 60 * 24 * 365,
    });

    // Return a success response:
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    // Handle invalid code error:
    if (error instanceof UnauthorisedAccessCodeError)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 404 }
      );

    // Handle other errors:
    return NextResponse.json(
      { success: false, error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
