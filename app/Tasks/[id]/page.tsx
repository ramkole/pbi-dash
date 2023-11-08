import TaskStatusBadge from "@/app/components/TaskStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const TasklDeatilsPage = async ({ params }: Props) => {
  const task = await prisma.pbi.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();
  return (
    <div>
      <Heading>{task.title}</Heading>
      <Flex className="space-x-3" my="2">
        <TaskStatusBadge status={task.status} />
        <Text> {task.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default TasklDeatilsPage;
