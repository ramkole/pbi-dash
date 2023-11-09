import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTaskSection = ({ taskid }: { taskid: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/task/${taskid}/edit`}>Edit Task</Link>
    </Button>
  );
};

export default EditTaskSection;
