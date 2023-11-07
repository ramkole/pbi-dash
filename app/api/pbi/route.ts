import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createPbiSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createPbiSchema.safeParse(body);

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
