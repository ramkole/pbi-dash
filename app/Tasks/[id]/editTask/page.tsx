import React from "react";
import TaskFormPage from "../../_components/TaskForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditFormPage = async ({ params }: Props) => {
  const task = await prisma.pbi.findUnique({
    where: { id: parseInt(params.id) },
  });
  console.log("task", task);

  if (!task) notFound();

  return <TaskFormPage task={task} />;
};

export default EditFormPage;
