import { KanbanCard } from "./KanbanCard";

import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

interface KanbanColumnProps {
    title: string;
    tasks: Task[];
    projects: Project[];
}

export const KanbanColumn = ({
    title,
    tasks,
    projects,
}: KanbanColumnProps) => {
    return (
        <section className="rounded-xl bg-gray-100 p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                    {title}
                </h2>

                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-600">
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
                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                    <div className="text-sm text-gray-500">
                        No tasks
                    </div>
                </div>
            )}
        </section>
    );
};