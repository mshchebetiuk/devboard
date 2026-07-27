export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    readonly id: number;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    projectId: number;
}