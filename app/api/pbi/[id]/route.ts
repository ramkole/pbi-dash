import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { TaskSchema } from "../../../validationSchema";

export async function PATCH(request: NextRequest, {params} : {params: {id : string}}) {
  const body = await request.json();

  const validation = TaskSchema.safeParse(body); 

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });


  const findTask = await prisma.pbi.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if(!findTask)
  return NextResponse.json({error: 'Invalid Task'}, { status: 404 })
  const updatedTask = await prisma.pbi.update({
    where: {
        id: findTask.id,
      },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: NextRequest, {params} : {params: {id : string}}) {

  const findTask = await prisma.pbi.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if(!findTask)
  return NextResponse.json({error: 'Invalid Task'}, { status: 404 })

await prisma.pbi.delete({
    where: {
        id: findTask.id,
      },
  });

  return NextResponse.json({});
}
