import bcrypt from "bcrypt";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return Promise.resolve(NextResponse.json(user));
  } catch (error) {
    return Promise.resolve(NextResponse.error(error, 500)); // Adjust the status code as needed
  }
}
