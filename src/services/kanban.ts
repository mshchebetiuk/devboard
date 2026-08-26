import { prisma } from "@/lib/prisma";

import type { KanbanTask } from "@/types/kanban";

export const getKanbanTasks = async (): Promise<KanbanTask[]> => {
  return prisma.task.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,

      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });
};
