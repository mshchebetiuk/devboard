"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { updateProject, type ProjectActionState } from "@/actions/projects";

import type { Project } from "@/types/project";
import { FormField } from "@/components/ui/FormField";

interface EditProjectFormProps {
  project: Project;
  onCancel: () => void;
}

const initialState: ProjectActionState = {
  success: false,
  message: "",
};

export const EditProjectForm = ({
  project,
  onCancel,
}: EditProjectFormProps) => {
  const [state, formAction, isPending] = useActionState(
    updateProject,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Project updated successfully");
      onCancel();
      return;
    }

    if (state.message) toast.error(state.message);
  }, [state, onCancel]);

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <input type="hidden" name="id" value={project.id} />

      <div>
        <FormField
          label="Name"
          htmlFor={`name-${project.id}`}
          error={state.errors?.name?.[0]}
        >
          <input
            id={`name-${project.id}`}
            name="name"
            type="text"
            defaultValue={project.name}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={
              state.errors?.name ? `name-${project.id}-error` : undefined
            }
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          />
        </FormField>
      </div>

      <div>
        <FormField
          label="Description"
          htmlFor={`description-${project.id}`}
          error={state.errors?.description?.[0]}
        >
          <textarea
            id={`description-${project.id}`}
            name="description"
            rows={3}
            defaultValue={project.description}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.description)}
            aria-describedby={
              state.errors?.description
                ? `description-error-${project.id}`
                : undefined
            }
            className="mt-1 w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          />
        </FormField>
      </div>

      <div>
        <FormField
          label="Progress"
          htmlFor={`progress-${project.id}`}
          error={state.errors?.progress?.[0]}
        >
          <input
            id={`progress-${project.id}`}
            name="progress"
            type="number"
            min={0}
            max={100}
            defaultValue={project.progress}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.progress)}
            aria-describedby={
              state.errors?.progress
                ? `progress-error-${project.id}`
                : undefined
            }
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          />
        </FormField>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium cursor-pointer text-white disabled:opacity-50 dark:bg-white dark:text-gray-900"
        >
          {isPending ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
