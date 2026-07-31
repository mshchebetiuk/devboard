export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskProject {
    id: number;
    name: string;
}

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date | null;
    project: TaskProject;
}