import { prisma } from "@/lib/prisma";
import type { KanbanTaskDto } from "@/types/dto";
import { mapTaskToKanbanDto } from "@/lib/mappers/task";

export const getKanbanTasks = async (): Promise<KanbanTaskDto[]> => {
  const tasks = await prisma.task.findMany({
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

  return tasks.map(mapTaskToKanbanDto);
};
