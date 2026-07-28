'use client';

import { useState } from 'react';
import { 
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';

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
    const [boardTasks, setBoardTasks] = useState<Task[]>(tasks);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as TaskStatus;

        if (!columns.some((column) => column.status === newStatus)) return;

        setBoardTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            )
        );
    };

    return (
        <DndContext 
            sensors={sensors}
            onDragEnd={handleDragEnd}
        >
            <div className="mt-8 grid items-start gap-4 lg:grid-cols-3">
                {columns.map((column) => {
                    const columnTasks = boardTasks.filter(
                        (task) => task.status === column.status
                    );

                    return (
                        <KanbanColumn 
                            key={column.status}
                            status={column.status}
                            title={column.title}
                            tasks={columnTasks}
                            projects={projects}
                        />
                    );
                })}
            </div>
        </DndContext>
    );
};