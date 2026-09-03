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

  const inputClassName =
    "mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500";

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
            className={inputClassName}
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
                ? `description-${project.id}-error`
                : undefined
            }
            className={`${inputClassName} resize-none`}
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
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
        >
          {isPending ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
