'use client';

import { useState } from 'react';

import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';

import { updateTaskStatus } from '@/actions/tasks';

import type {
    KanbanStatus,
    KanbanTask,
} from '@/types/kanban';

import { KanbanColumn } from './KanbanColumn';
import { KanbanTaskCard } from './KanbanTaskCard';

interface KanbanBoardProps {
    initialTasks: KanbanTask[];
}

const columns: {
    id: KanbanStatus;
    title: string;
}[] = [
    {
        id: 'TODO',
        title: 'Todo',
    },
    {
        id: 'IN_PROGRESS',
        title: 'In Progress',
    },
    {
        id: 'DONE',
        title: 'Done',
    },
];

export const KanbanBoard = ({
    initialTasks,
}: KanbanBoardProps) => {
    const [tasks, setTasks] = useState(initialTasks);

    const [activeTask, setActiveTask] = 
        useState<KanbanTask | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragStart = (
        event: DragStartEvent
    ) => {
        const task = tasks.find(
            (task) => task.id === event.active.id
        );

        setActiveTask(task ?? null);
    };

    const handleDragEnd = async (
        event: DragEndEvent
    ) => {
        const { active, over } = event;

        setActiveTask(null);

        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as KanbanStatus;

        if (!columns.some((column) => column.id === newStatus)) return;

        const task = tasks.find(
            (task) => task.id === taskId
        );

        if (!task || task.status === newStatus) return;

        const previousTasks = tasks;

        setTasks((currentTasks) => 
            currentTasks.map((task) => 
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                    }
                    : task
            )
        );

        try {
            await updateTaskStatus(
                taskId,
                newStatus
            );
        } catch (error) {
            console.error('Failed to move task:', error);
            setTasks(previousTasks);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid gap-6 lg:grid-cols-3">
                {columns.map((column) => {
                    const columnTasks = tasks.filter(
                        (task) => 
                            task.status === column.id
                    );

                    return (
                        <KanbanColumn 
                            key={column.id}
                            id={column.id}
                            title={column.title}
                            tasks={columnTasks}
                        />
                    );
                })}
            </div>

            <DragOverlay>
                {activeTask ? (
                    <KanbanTaskCard 
                        task={activeTask}
                        isOverlay
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};