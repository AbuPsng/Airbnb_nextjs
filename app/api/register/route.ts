import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const existUser = await prisma.user.findFirst({ where: { email } });

    if (existUser) {
      return new Error("User already exist with this account");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(error.message, { status: 500 }); // Return a proper error response
  }
}
