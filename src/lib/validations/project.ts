import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(60, "Name must contain at most 60 characters."),

  description: z
    .string()
    .trim()
    .min(5, "Description must contain at least 5 characters.")
    .max(300, "Description must contain at most 300 characters."),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.coerce.number().int().positive(),
  progress: z.coerce.number().int().min(0).max(100),
});

export const projectIdSchema = z.coerce.number().int().positive();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
