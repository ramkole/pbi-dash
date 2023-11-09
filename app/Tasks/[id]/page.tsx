import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskSection from "./EditTaskSection";
import TaskDetails from "./TaskDetails";

interface Props {
  params: { id: string };
}

const TasklDeatilsPage = async ({ params }: Props) => {
  const task = await prisma.pbi.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <TaskDetails task={task} />
      </Box>
      <Box>
        <EditTaskSection taskid={task.id} />
      </Box>
    </Grid>
  );
};

export default TasklDeatilsPage;
