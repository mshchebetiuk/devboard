'use server';

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createTaskSchema } from "@/lib/validations/task";

export interface TaskActionState {
    success: boolean;
    message: string;
    errors?: {
        title?: string[];
        status?: string[];
        priority?: string[];
        projectId?: string[];
        dueDate?: string[];
    };
}

export async function createTask(
    _previousState: TaskActionState,
    formData: FormData
): Promise<TaskActionState> {
    const result = createTaskSchema.safeParse({
        title: formData.get('title'),
        status: formData.get('status'),
        priority: formData.get('priority'),
        projectId: formData.get('projectId'),
        dueDate: formData.get('dueDate'),
    });

    if (!result.success) {
        return {
            success: false,
            message: "Please check the form fields.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: result.data.projectId,
            },

            select: {
                id: true,
            },
        });

        if (!project) {
            return {
                success: false,
                message: 'Selected project does not exist.',
            };
        }

        await prisma.task.create({
            data: {
                title: result.data.title,
                status: result.data.status,
                priority: result.data.priority,
                dueDate: result.data.dueDate,
                projectId: result.data.projectId,
            },
        });

        revalidatePath('/tasks');

        return {
            success: true,
            message: 'Task created successfully',
        };
    } catch (error) {
        console.error('Failed to create task:', error);

        return {
            success: false,
            message: 'Failed to create task.',
        };
    }
}