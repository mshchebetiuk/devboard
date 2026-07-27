import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

export const projects: Project[] = [
    {
        id: 1,
        name: 'DevBoard',
        description: 'Project management dashboard built with Next.js',
        progress: 35,
    },
    {
        id: 2,
        name: 'E-Commerce Store',
        description: 'Modern online store built with Next.js',
        progress: 80,
    },
    {
        id: 3,
        name: 'Portfolio',
        description: 'Personal developer portfolio website',
        progress: 100,
    },
];

export const tasks: Task[] = [
    {
        id: 1,
        title: 'Create dashboard layout',
        status: 'done',
        priority: 'high',
        dueDate: '2026-07-25',
        projectId: 1,
    },
    {
        id: 2,
        title: 'Add sidebar navigation',
        status: 'done',
        priority: 'medium',
        dueDate: '2026-07-26',
        projectId: 1,
    },
    {
        id: 3,
        title: 'Create statistics cards',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-07-28',
        projectId: 1,
    },
    {
        id: 4,
        title: 'Create projects section',
        status: 'todo',
        priority: 'medium',
        dueDate: '2026-07-30',
        projectId: 1,
    },
    {
        id: 5,
        title: 'Improve responsive design',
        status: 'todo',
        priority: 'low',
        dueDate: '2026-08-02',
        projectId: 2,
    },
    
]