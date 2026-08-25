import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { getDashboardData } from "@/services/dashboard";

export default async function DashboardPage() {
  const {
    recentProjects,
    totalProjects,
    totalTasks,
    completedTasks,
    inProgressTasks,
  } = await getDashboardData();

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

      <RecentProjects projects={recentProjects} />
    </section>
  );
}
