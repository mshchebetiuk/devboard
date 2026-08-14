import { z } from "zod";

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must contain at least 2 characters")
    .max(100, "Title must contain at most 100 characters"),

  status: taskStatusSchema,
  priority: taskPrioritySchema,

  projectId: z.coerce.number().int().positive("Please select a project"),

  dueDate: z
    .string()
    .optional()
    .transform((value) => {
      if (!value) return null;
      return new Date(`${value}T00:00:00`);
    }),
});

export const updateTaskSchema = createTaskSchema.extend({
  id: z.coerce.number().int().positive("Invalid task ID."),
});

export const taskIdSchema = z.number().int().positive();
