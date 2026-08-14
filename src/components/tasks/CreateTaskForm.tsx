"use client";

import { useActionState, useEffect, useRef } from "react";

import { createTask, type TaskActionState } from "@/actions/tasks";

import type { ProjectOption } from "@/types/project";

interface CreateTaskFormProps {
  projects: ProjectOption[];
}

const initialState: TaskActionState = {
  success: false,
  message: "",
};

export const CreateTaskForm = ({ projects }: CreateTaskFormProps) => {
  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Create Task
      </h2>

      <div className="mt-5">
        <label
          htmlFor="task-title"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>

        <input
          id="task-title"
          name="title"
          type="text"
          disabled={isPending}
          aria-invalid={Boolean(state.errors?.title)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />

        {state.errors?.title && (
          <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="task-project"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Project
          </label>

          <select
            id="task-project"
            name="projectId"
            defaultValue=""
            disabled={isPending}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="" disabled>
              Select Project
            </option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {state.errors?.projectId && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.projectId[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="task-due-date"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due Date
          </label>

          <input
            id="task-due-date"
            name="dueDate"
            type="date"
            disabled={isPending}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="task-status"
            className="text-sm font-medium text-gray-700 dark:text-gray-700"
          >
            Status
          </label>

          <select
            id="task-status"
            name="status"
            defaultValue="TODO"
            disabled={isPending}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="task-priority"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>

          <select
            id="task-priority"
            name="priority"
            defaultValue="MEDIUM"
            disabled={isPending}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className={`mt-4 text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || projects.length === 0}
        className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900"
      >
        {isPending ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};
