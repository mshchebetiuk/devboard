import { prisma } from "@/lib/prisma";
import type { KanbanTaskDto } from "@/types/dto";

export const getKanbanTasks = async (): Promise<KanbanTaskDto[]> => {
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
