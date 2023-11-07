"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface NewPbiForm {
  title: string;
  description: string;
}

const NewPbiPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<NewPbiForm>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/pbi", data);
        router.push("/tasks");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="description" {...field} />
        )}
      />

      <Button>Create PBI</Button>
    </form>
  );
};

export default NewPbiPage;
