'use client';

import { useDroppable } from '@dnd-kit/core'

import { KanbanCard } from "./KanbanCard";

import type { Project } from '@/types/project';
import type { Task, TaskStatus } from '@/types/task';

interface KanbanColumnProps {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    projects: Project[];
}

export const KanbanColumn = ({
    title,
    status,
    tasks,
    projects,
}: KanbanColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    return (
        <section 
            ref={setNodeRef}
            className={`min-h-80 rounded-xl p-4 transition border-gray-200 dark:bg-gray-900 dark:border-gray-800 ${
                isOver ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-100 dark:text-gray-700'
            }`}
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 dark:text-gray-200">
                    {title}
                </h2>

                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-950 dark:text-gray-300">
                    {tasks.length}
                </span>
            </div>

            {tasks.length > 0 ? (
                <div className="space-y-3">
                    {tasks.map((task) => {
                        const project = projects.find(
                            (project) => project.id === task.projectId
                        );

                        return (
                            <KanbanCard 
                                key={task.id}
                                task={task}
                                project={project}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-500">
                        Drop tasks here
                    </p>
                </div>
            )}
        </section>
    );
};