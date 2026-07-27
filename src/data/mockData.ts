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
        id: 1,
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
        projectId: 1,
    },
    {
        id: 2,
        title: 'Add sidebar navigation',
        status: 'done',
        projectId: 1,
    },
    {
        id: 3,
        title: 'Create statistics cards',
        status: 'in-progress',
        projectId: 1,
    },
    {
        id: 4,
        title: 'Create projects section',
        status: 'todo',
        projectId: 1,
    },
    {
        id: 5,
        title: 'Improve responsive design',
        status: 'todo',
        projectId: 2,
    },
    
]