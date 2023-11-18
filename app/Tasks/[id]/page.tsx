import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTaskSection from "./EditTaskSection";
import TaskDetails from "./TaskDetails";
import DeleteTaskSection from "./DeleteTaskSection";
import { getServerSession } from "next-auth";
import authAOptions from "@/app/auth/AuthOptions";

interface Props {
  params: { id: string };
}

const TasklDeatilsPage = async ({ params }: Props) => {
  const session = await getServerSession(authAOptions);

  const task = await prisma.pbi.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <TaskDetails task={task} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="3">
            <EditTaskSection taskid={task.id} />
            <DeleteTaskSection taskid={task.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export default TasklDeatilsPage;
