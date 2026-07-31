'use client';

import { useMemo, useState } from 'react';

import { EmptyState } from '../ui/EmptyState';
import type { ProjectOption } from '@/types/project';
import type { Task } from '@/types/task';

import { TaskCard } from './TaskCard';

interface TasksListProps {
    tasks: Task[];
    projects: ProjectOption[];
}

export const TasksList = ({
    tasks,
    projects,
}: TasksListProps) => {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('ALL')

    const filteredTasks = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return tasks.filter((task) => {
            const matchesSearch = task.title
                .toLowerCase()
                .includes(normalizedSearch);

            const matchesStatus = 
                status === 'ALL' || task.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [tasks, search, status]);

    return (
        <div className="mt-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <input 
                    type="search" 
                    placeholder='Search tasks...'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className='rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900'
                />

                <select 
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className='rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900'
                >
                    <option value="ALL">All statuses</option>
                    <option value="TODO">Todo</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>

            {filteredTasks.length > 0 ? (
                <div className="space-y-4">
                    {filteredTasks.map((task) => (
                        <TaskCard 
                            key={task.id}
                            task={task}
                            projects={projects}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState 
                    title='No tasks found'
                    description='Try changing your search or status filter.'
                />
            )}
        </div>
    );
};