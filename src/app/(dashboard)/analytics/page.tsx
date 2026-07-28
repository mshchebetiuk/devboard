import { AnalyticsCard } from "@/components/analytics/AnalyticsCard";
import { ProjectProgress } from "@/components/analytics/ProjectProgress";
import { TaskStatusOverview } from "@/components/analytics/TaskStatusOverview";
import { ProjectProgressChart } from "@/components/analytics/ProjectProgressChart";
import { TaskStatusChart } from "@/components/analytics/TaskStatusChart";

import { 
    projects,
    tasks,
    users,
} from '@/data/mockData';

export default function AnalyticsPage() {
    const completedTasks = tasks.filter(
        (task) => task.status === 'done'
    ).length;

    const completionRate = 
        tasks.length > 0
            ? Math.round(
                (completedTasks / tasks.length) * 100
            )
            : 0;

    const averageProjectProgress = 
        projects.length > 0
            ? Math.round(
                projects.reduce(
                    (total, project) => 
                        total + project.progress,
                    0
                ) / projects.length
            )
            : 0;

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
                    value={projects.length}
                    description="Projects in workspace"
                />

                <AnalyticsCard 
                    title="Total Tasks"
                    value={tasks.length}
                    description="Tasks across all projects"
                />

                <AnalyticsCard 
                    title="Completion Rate"
                    value={`${completionRate}`}
                    description="Tasks completed"
                />

                <AnalyticsCard 
                    title="Team Members"
                    value={users.length}
                    description="Members in workspace"
                />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <TaskStatusOverview tasks={tasks} />
                <ProjectProgress projects={projects} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <TaskStatusChart tasks={tasks} />
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