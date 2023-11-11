import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { TaskLink, TaskStatusBadge } from "../components";
import TaskAction from "./TaskAction";

const TaskPage = async () => {
  const allTasks = await prisma.pbi.findMany();

  return (
    <div>
      <TaskAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allTasks.map((task) => (
            <Table.Row key={task.id}>
              <Table.Cell>
                <TaskLink href={`/tasks/${task.id}`}>{task.title}</TaskLink>
                <div className="block md:hidden">
                  <TaskStatusBadge status={task.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {task.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TaskPage;
