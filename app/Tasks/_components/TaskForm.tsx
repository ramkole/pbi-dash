"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { TaskSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pbi } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type PbiFormData = z.infer<typeof TaskSchema>;

const TaskFormPage = ({ task }: { task?: Pbi }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PbiFormData>({
    resolver: zodResolver(TaskSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (task) await axios.patch("/api/pbi/" + task.id, data);
      else await axios.post("/api/pbi", data);
      router.push("/tasks");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("Unexpected error");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={task?.title}
            placeholder="title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {task ? "Update Task" : "Create Task"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaskFormPage;
