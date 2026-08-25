import { prisma } from "@/lib/prisma";

import { buildTaskOrderBy, buildTaskWhere } from "@/lib/queries/tasks";

import type { TaskStatus } from "@prisma/client";

interface GetTasksOptions {
  page: number;
  pageSize: number;
  search: string;
  status?: TaskStatus;
  sort: string;
}

export const getTasks = async ({
  page,
  pageSize,
  search,
  status,
  sort,
}: GetTasksOptions) => {
  const where = buildTaskWhere({
    search,
    status,
  });

  const orderBy = buildTaskOrderBy(sort);

  const [totalTasks, projects] = await Promise.all([
    prisma.task.count({ where }),

    prisma.project.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  const totalPages = Math.max(Math.ceil(totalTasks / pageSize), 1);

  const currentPage = Math.min(page, totalPages);

  const tasks = await prisma.task.findMany({
    where,

    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      dueDate: true,

      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy,

    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const serializedTasks = tasks.map((task) => ({
    ...task,
    dueDate: task.dueDate?.toISOString() ?? null,
  }));

  return {
    tasks: serializedTasks,
    projects,
    totalTasks,
    totalPages,
    currentPage,
  };
};
