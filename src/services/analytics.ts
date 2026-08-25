import { prisma } from "@/lib/prisma";

export const getAnalyticsData = async () => {
  const [
    projects,
    totalProjects,
    totalTasks,
    completedTasks,
    todoTasks,
    inProgressTasks,
    teamMembers,
    averageProgress,
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
        status: "TODO",
      },
    }),

    prisma.task.count({
      where: {
        status: "TODO",
      },
    }),

    prisma.user.count(),

    prisma.project.aggregate({
      _avg: {
        progress: true,
      },
    }),
  ]);

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const averageProjectProgress = Math.round(averageProgress._avg.progress ?? 0);

  const taskStats = {
    todo: todoTasks,
    inProgress: inProgressTasks,
    done: completedTasks,
    total: totalTasks,
  };

  return {
    projects,
    totalProjects,
    totalTasks,
    completionRate,
    teamMembers,
    averageProjectProgress,
    taskStats,
  };
};
