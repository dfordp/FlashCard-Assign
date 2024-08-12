import client from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { authentication } from "../../../../helpers";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: RequestBody = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const user = await client.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new NextResponse('Invalid Credentials', { status: 400 });
    }

    const salt = user.salt;
    if (!salt) {
      throw new Error('Salt is undefined');
    }
    const hashedPassword = await authentication(salt, password);

    if (user.password !== hashedPassword) {
      return new NextResponse('Invalid Credentials', { status: 400 });
    }

    if (typeof process.env.NEXT_PUBLIC_AUTH_SECRET !== 'string') {
      // Handle the case where secret is undefined
      throw new Error('Authentication secret is not configured properly.');
    }

    const token = sign(
      { id: user.id }, // payload
      process.env.NEXT_PUBLIC_AUTH_SECRET as string, // secret
      {} // options
    );

    return NextResponse.json({ user, token });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}