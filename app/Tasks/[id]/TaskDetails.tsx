import { TaskStatusBadge } from "@/app/components";
import { Pbi } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const TaskDetails = ({ task }: { task: Pbi }) => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Flex className="space-x-3" my="2">
        <TaskStatusBadge status={task.status} />
        <Text> {task.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{task.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TaskDetails;
