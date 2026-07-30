'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { 
    createProjectSchema,
    projectIdSchema, 
    updateProjectSchema,
} from '@/lib/validations/project';

export interface ProjectActionState {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        description?: string[];
        progress?: string[];
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

export async function updateProject(
    _previousState: ProjectActionState,
    formData: FormData
): Promise<ProjectActionState> {
    const result = updateProjectSchema.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
        description: formData.get('description'),
        progress: formData.get('progress'),
    });

    if (!result.success) {
        return {
            success: false, 
            message: 'Please check the form fields',
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.project.update({
            where: {
                id: result.data.id,
            },
            data: {
                name: result.data.name,
                description: result.data.description,
                progress: result.data.progress,
            },
        });

        revalidatePath('/projects');

        return {
            success: true,
            message: 'Project updated successfully.',
        };
    } catch (error) {
        console.error('Failed to update project', error);

        return {
            success: false,
            message: 'Failed to update project.',
        };
    }
}

export async function deleteProject(
    formData: FormData
): Promise<void> {
    const result = projectIdSchema.safeParse(
        formData.get('id')
    );

    if (!result.success) {
        throw new Error('Invalid project id.');
    }

    await prisma.project.delete({
        where: {
            id: result.data,
        },
    });

    revalidatePath('/projects')
}