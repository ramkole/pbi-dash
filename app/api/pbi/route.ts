import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { TaskSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = TaskSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newPbi = await prisma.pbi.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newPbi, { status: 201 });
}
