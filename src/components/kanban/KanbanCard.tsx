import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

interface KanbanCardProps {
    task: Task;
    project?: Project;
}

const priorityStyles = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-amber-50 text-amber-700',
    high: 'bg-red-50 text-red-700',
};

export const KanbanCard = ({
    task,
    project,
}: KanbanCardProps) => {
    return (
        <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                {task.title}
            </div>

            <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
            >
                {task.priority}
            </span>

            <p className="mt-3 text-sm text-gray-500">
                {project?.name ?? 'Unknown project'}
            </p>

            <time
                dateTime={task.dueDate}
                className='mt-3 block text-xs text-gray-400'
            >
                Due {task.dueDate}
            </time>
        </article>
    );
};