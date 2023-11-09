import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditTaskSection = ({ taskid }: { taskid: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/tasks/${taskid}/editTask`}>Edit Task</Link>
    </Button>
  );
};

export default EditTaskSection;
