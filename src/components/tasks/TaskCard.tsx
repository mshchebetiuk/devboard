import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

interface TaskCardProps {
    task: Task;
    project?: Project;
}

const statusLabels = {
    todo: 'Todo',
    'in-progress': 'In Progress',
    done: 'Done',
};

const priorityStyles = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-amber-50 text-amber-700',
    high: 'bg-red-50 text-red-700',
};

export const TaskCard = ({
    task,
    project,
}: TaskCardProps) => {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-200">
                        {project?.name ?? 'Unknown project'}
                    </p>

                    <h3 className="mt-1 font-semibold text-gray-900 dark:text-gray-300">
                        {task.title}
                    </h3>
                </div>

                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
                >
                    {task.priority}
                </span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-200">
                    {statusLabels[task.status]}
                </span>

                <time
                    dateTime={task.dueDate}
                    className='text-sm text-gray-500 dark:text-gray-200'
                >
                    {task.dueDate}
                </time>
            </div>
        </article>
    );
};