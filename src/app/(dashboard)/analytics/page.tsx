import { AnalyticsCard } from "@/components/analytics/AnalyticsCard";
import { ProjectProgress } from "@/components/analytics/ProjectProgress";
import { TaskStatusOverview } from "@/components/analytics/TaskStatusOverview";
import { ProjectProgressChart } from "@/components/analytics/ProjectProgressChart";
import { TaskStatusChart } from "@/components/analytics/TaskStatusChart";
import { getAnalyticsData } from "@/services/analytics";

export default async function AnalyticsPage() {
  const {
    projects,
    totalProjects,
    totalTasks,
    completionRate,
    teamMembers,
    averageProjectProgress,
    taskStats,
  } = await getAnalyticsData();

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Analytics
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
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
          value={totalTasks}
          description="Tasks across all projects"
        />

        <AnalyticsCard
          title="Completion Rate"
          value={`${completionRate}%`}
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

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Average Project Progress
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {averageProjectProgress}%
        </p>
      </div>
    </section>
  );
}
