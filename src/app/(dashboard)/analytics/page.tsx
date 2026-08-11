import { AnalyticsCard } from "@/components/analytics/AnalyticsCard";
import { ProjectProgress } from "@/components/analytics/ProjectProgress";
import { TaskStatusOverview } from "@/components/analytics/TaskStatusOverview";
import { ProjectProgressChart } from "@/components/analytics/ProjectProgressChart";
import { TaskStatusChart } from "@/components/analytics/TaskStatusChart";

import { prisma } from "@/lib/prisma";

export default async function AnalyticsPage() {
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
        status: "IN_PROGRESS",
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

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Analytics
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-300">
          Track project and team performance.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Projects"
          value={totalProjects}
          description="Projects in workspace"
        />

        <AnalyticsCard
          title="Total Tasks"
          value={totalProjects}
          description="Tasks across all projects"
        />

        <AnalyticsCard
          title="Completion Rate"
          value={`${completionRate}`}
          description="Tasks completed"
        />

        <AnalyticsCard
          title="Team Members"
          value={teamMembers}
          description="Members in workspace"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <TaskStatusOverview stats={taskStats} />
        <ProjectProgress projects={projects} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <TaskStatusChart stats={taskStats} />
        <ProjectProgressChart projects={projects} />
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-950 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
          Average Project Progress
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-200">
          {averageProjectProgress}%
        </p>
      </div>
    </section>
  );
}
