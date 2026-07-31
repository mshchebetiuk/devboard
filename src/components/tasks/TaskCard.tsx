import type { Task } from '@/types/task';

interface TaskCardProps {
    task: Task;
}

const formatStatus = (
    status: Task['status']
) => {
    switch (status) {
        case 'TODO':
            return 'Todo';

        case 'IN_PROGRESS':
            return 'In Progress';

        case 'DONE':
            return 'Done';
    }
}

const formatPriority = (
    priority: Task['priority']
) => {
    return (
        priority.charAt(0) +
        priority.slice(1).toLowerCase()
    );
};

export const TaskCard = ({
    task,
}: TaskCardProps) => {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {task.project.name}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className="flex items-center rounded-xl bg-gray-100 px-3 py-0.5 text-xs font-medium dark:bg-gray-800">
                        {formatStatus(task.status)}
                    </span>

                    <span className="flex items-center rounded-xl bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800">
                        {formatPriority(task.priority)}
                    </span>
                </div>
            </div>

            {task.dueDate && (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Due:{' '}
                    {task.dueDate.toLocaleDateString(
                        'en-GB'
                    )}
                </p>
            )}
        </article>
    );
};