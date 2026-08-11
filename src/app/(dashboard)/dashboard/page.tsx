import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [projects, totalTasks, completedTasks, inProgressTasks] =
    await Promise.all([
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

  const totalProjects = await prisma.project.count();

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          Welcome back!
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-300">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          description="All active projects"
        />

        <StatsCard
          title="Total Tasks"
          value={totalTasks}
          description="Tasks across project"
        />

        <StatsCard
          title="Completed"
          value={completedTasks}
          description="Completed tasks"
        />

        <StatsCard
          title="In Progress"
          value={inProgressTasks}
          description="Currently in progress"
        />
      </div>

      <RecentProjects projects={projects} />
    </section>
  );
}
