export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    readonly id: number;
    title: string;
    status: TaskStatus;
    projectId: number;
}