import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

const handler = async (req: NextRequest, res: NextResponse) => {
  const registerData = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: registerData.email,
      },
    });

    if (user) {
      throw new Error("User Exists");
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 12);
    await prisma.user.create({
      data: {
        name: registerData.name,
        email: registerData.email,
        hashedPassword: hashedPassword,
        emailVerified: new Date(),
      },
    });

    return NextResponse.json("Account created");
  } catch (error) {
    return NextResponse.json(error);
  }
};

export { handler as POST };
