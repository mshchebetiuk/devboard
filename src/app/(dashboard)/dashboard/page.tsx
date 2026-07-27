import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { projects, tasks } from '@/data/mockData';

export default function DashboardPage() {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === 'done'
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === 'in-progress'
    ).length;

    return (
        <section>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back!
                </h2>

                <p className="mt-2 text-gray-500">
                    Here&apos;s what&apos;s happening with your projects today.
                </p>    
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatsCard 
                    title='Total Projects'
                    value={totalProjects}
                    description='All active projects'
                />
                
                <StatsCard 
                    title='Total Tasks'
                    value={totalTasks}
                    description='Tasks across project'
                />

                <StatsCard 
                    title='Completed'
                    value={completedTasks}
                    description='Completed tasks'
                />

                <StatsCard 
                    title='In Progress'
                    value={inProgressTasks}
                    description='Currently in progress'
                />
            </div>
            
            <RecentProjects projects={projects} />
        </section>
    );
}