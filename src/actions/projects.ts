'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { createProjectSchema } from '@/lib/validations/project';

export interface ProjectActionState {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        description?: string[];
    };
}

export async function createProject(
    _previousState: ProjectActionState,
    formData: FormData
): Promise<ProjectActionState> {
    const result = createProjectSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!result.success) {
        return {
            success: false,
            message: 'Please check the form fields.',
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.project.create({
            data: {
                name: result.data.name, 
                description: result.data.description,
            },
        });

        revalidatePath('/projects');

        return {
            success: true,
            message: 'Project created successfully.',
        };
    } catch (error) {
        console.error('Failed to create project:', error);

        return {
            success: false,
            message: 'Failed to create project.',
        };
    }
}