import type { Task, TaskStatus } from '@/types/task';

interface TaskStatusOverviewProps {
    tasks: Task[];
}

const statuses: {
    status: TaskStatus;
    label: string;
}[] = [
    {
        status: 'todo',
        label: 'Todo',
    },
    {
        status: 'in-progress',
        label: 'In Progress',
    },
    {
        status: 'done',
        label: 'Done',
    },
];

export const TaskStatusOverview = ({
    tasks,
}: TaskStatusOverviewProps) => {
    const totalTasks = tasks.length;

    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
                Tasks by Status
            </h2>

            <div className="mt-6 space-y-5">
                {statuses.map(({ status, label }) => {
                    const count = tasks.filter(
                        (task) => task.status === status
                    ).length;

                    const percentage = 
                        totalTasks > 0 
                            ? Math.round((count / totalTasks) * 100)
                            : 0;

                    return (
                        <div key={status}>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">
                                    {label}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {count} ({percentage}%)
                                </span>
                            </div>

                            <div 
                                className="h-2 overflow-hidden rounded-full bg-gray-100"
                                role='progressbar'
                                aria-label={`${label} tasks`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={percentage}
                            >
                                <div 
                                    className="h-full rounded-full bg-gray-900"
                                    style={{
                                        width: `${percentage}%`,
                                    }}    
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};