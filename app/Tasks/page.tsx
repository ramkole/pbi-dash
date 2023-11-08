"use client";

import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TaskStatusBadge from "../components/TaskStatusBadge";
import delay from "delay";
import TaskAction from "./TaskAction";

const TaskPage = async () => {
  const allTasks = await prisma.pbi.findMany();
  await delay(7000);
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
          {allTasks.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden">
                  <TaskStatusBadge status={issue.status} />{" "}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TaskStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TaskPage;
