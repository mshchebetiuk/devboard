'use client';

import { useState } from 'react';

import { deleteTask } from '@/actions/tasks';

import type { ProjectOption } from '@/types/project';
import type { Task } from '@/types/task';

import { EditTaskForm } from './EditTaskForm';

interface TaskCardProps {
    task: Task;
    projects: ProjectOption[];
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
    projects,
}: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    Edit Task
                </h3>

                <EditTaskForm 
                    task={task}
                    projects={projects}
                    onCancel={() => setIsEditing(false)}
                />
            </article>
        );
    }

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
                    {new Date(task.dueDate).toLocaleDateString('en-GB')}
                </p>
            )}

            <div className="mt-5 flex items-center gap-2">
                <button
                    type='button'
                    onClick={() => setIsEditing(true)}
                    className='rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                >
                    Edit
                </button>

                <form 
                    action={deleteTask}
                    onSubmit={(event) => {
                        const confirmed = window.confirm(
                            `Delete "${task.title}"?`
                        );

                        if (!confirmed) event.preventDefault();
                    }}
                >
                    <input 
                        type="hidden" 
                        name='id'
                        value={task.id}
                    />

                    <button 
                        type="submit"
                        className='rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700'
                    >
                        Delete
                    </button>
                </form>
            </div>
        </article>
    );
};