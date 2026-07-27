'use client';

import { useMemo, useState } from 'react';

import { TaskCard } from './TaskCard';
import type { Project } from '@/types/project';
import type { Task, TaskStatus } from '@/types/task';

type StatusFilter = 'all' | TaskStatus;

interface TasksListProps {
    tasks: Task[];
    projects: Project[];
}

export const TasksList = ({
    tasks,
    projects,
}: TasksListProps) => {
    const [search, setSearch] = useState<string>('');
    const [status, setStatus] = useState<StatusFilter>('all');

    const filteredTasks = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tasks.filter((task) => {
            const matchesSearch = task.title
                .toLowerCase()
                .includes(query);

            const matchesStatus = 
                status === 'all' || task.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [tasks, search, status]);

    return (
        <div className="mt-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="task-search" className="sr-only">
                    Search tasks
                </label>

                <input 
                    id="task-search" 
                    type="search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search tasks...'
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-400 sm:max-w-sm" 
                />

                <label htmlFor="task-status" className="sr-only">
                    Filter by status
                </label>

                <select 
                    id="task-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as StatusFilter)}
                    className='rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-gray-400'
                >
                    <option value="all">All statuses</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            {filteredTasks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredTasks.map((task) => {
                        const project = projects.find(
                            (project) => project.id === task.projectId
                        );

                        return (
                            <TaskCard 
                                key={task.id}
                                task={task}
                                project={project}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <h3 className="font-semibold text-gray-900">
                        No tasks found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        Try changing your search or status filter.
                    </p>
                </div>
            )}
        </div>
    );
};