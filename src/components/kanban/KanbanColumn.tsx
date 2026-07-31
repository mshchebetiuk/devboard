'use client';

import { useDroppable } from '@dnd-kit/core'

import type {
    KanbanStatus,
    KanbanTask,
} from '@/types/kanban';

import { KanbanTaskCard } from './KanbanTaskCard';


interface KanbanColumnProps {
    id: KanbanStatus;
    title: string;
    tasks: KanbanTask[];
}

export const KanbanColumn = ({
    id,
    title,
    tasks,
}: KanbanColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <section
            ref={setNodeRef}
            className={`min-h-96 rounded-xl border p-4 transition ${
                isOver 
                    ? 'border-gray-500 bg-gray-100 dark:bg-gray-800'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900'
            }`}
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>

                <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    {tasks.length}
                </span>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <KanbanTaskCard 
                        key={task.id}
                        task={task}
                    />
                ))}

                {tasks.length === 0 && (
                    <p className="py-8 text-center text-sm text-gray-400">
                        Drop tasks here
                    </p>
                )}
            </div>
        </section>
    );
};