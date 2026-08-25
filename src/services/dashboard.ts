import { prisma } from "@/lib/prisma";

export const getDashboardData = async () => {
  const [
    recentProjects,
    totalProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
  ] = await Promise.all([
    prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        progress: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),

    prisma.project.count(),
    prisma.task.count(),
    prisma.task.count({
      where: {
        status: "DONE",
      },
    }),

    prisma.task.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),
  ]);

  return {
    recentProjects,
    totalProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
  };
};
