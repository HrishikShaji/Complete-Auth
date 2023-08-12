import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const userId = params.userId;
  console.log(userId, "this ran");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    console.log(user);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
