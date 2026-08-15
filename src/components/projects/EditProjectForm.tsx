"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { updateProject, type ProjectActionState } from "@/actions/projects";

import type { Project } from "@/types/project";

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
        <label
          htmlFor={`name-${project.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>

        <input
          id={`name-${project.id}`}
          name="name"
          type="text"
          defaultValue={project.name}
          disabled={isPending}
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={
            state.errors?.name ? `name-error-${project.id}` : undefined
          }
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />

        {state.errors?.name && (
          <p
            id={`name-error-${project.id}`}
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`description-${project.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>

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

        {state.errors?.description && (
          <p
            id={`description-error-${project.id}`}
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`progress-${project.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Progress
        </label>

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
            state.errors?.progress ? `progress-error-${project.id}` : undefined
          }
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />

        {state.errors?.progress && (
          <p
            id={`progress-error-${project.id}`}
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.progress[0]}
          </p>
        )}
      </div>

      {/* {state.message && (
        <p
          aria-live="polite"
          className={`text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )} */}

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
