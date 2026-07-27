import { KanbanColumn } from "./KanbanColumn";

import type { Project } from '@/types/project';
import type { Task, TaskStatus } from '@/types/task';

interface KanbanBoardProps {
    tasks: Task[];
    projects: Project[];
}

const columns: {
    title: string;
    status: TaskStatus;
}[] = [
    {
        title: 'Todo',
        status: 'todo',
    },
    {
        title: 'In Progress',
        status: 'in-progress',
    },
    {
        title: 'Done',
        status: 'done',
    },
];

export const KanbanBoard = ({
    tasks,
    projects,
}: KanbanBoardProps) => {
    return (
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-3">
            {columns.map((column) => {
                const columnTasks = tasks.filter(
                    (task) => task.status === column.status
                );

                return (
                    <KanbanColumn 
                        key={column.status}
                        title={column.title}
                        tasks={columnTasks}
                        projects={projects}
                    />
                );
            })}
        </div>
    );
};