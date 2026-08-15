"use client";

import { useActionState, useEffect } from "react";

import { updateTask, type TaskActionState } from "@/actions/tasks";

import type { ProjectOption } from "@/types/project";
import type { Task } from "@/types/task";
import { toast } from "sonner";

interface EditTaskFormProps {
  task: Task;
  projects: ProjectOption[];
  onCancel: () => void;
}

const initialState: TaskActionState = {
  success: false,
  message: "",
};

export const EditTaskForm = ({
  task,
  projects,
  onCancel,
}: EditTaskFormProps) => {
  const [state, formAction, isPending] = useActionState(
    updateTask,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Task updated successfully");
      onCancel();
      return;
    }

    if (state.message) toast.error(state.message);
  }, [state, onCancel]);

  const dueDate = task.dueDate ? task.dueDate.slice(0, 10) : "";

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={task.id} />

      <div>
        <label
          htmlFor={`task-title-${task.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>

        <input
          id={`task-title-${task.id}`}
          name="title"
          type="text"
          defaultValue={task.title}
          disabled={isPending}
          aria-invalid={Boolean(state.errors?.title)}
          aria-describedby={
            state.errors?.title ? `task-title-error-${task.id}` : undefined
          }
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />

        {state.errors?.title && (
          <p
            id={`task-title-error-${task.id}`}
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`task-project-${task.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project
        </label>

        <select
          id={`task-project-${task.id}`}
          name="projectId"
          defaultValue={task.project.id}
          disabled={isPending}
          aria-invalid={Boolean(state.errors?.projectId)}
          aria-describedby={
            state.errors?.projectId
              ? `task-project-error-${task.id}`
              : undefined
          }
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {state.errors?.projectId && (
          <p
            id={`task-project-error-${task.id}`}
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.projectId[0]}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`task-status-${task.id}`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id={`task-status-${task.id}`}
            name="status"
            defaultValue={task.status}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.status)}
            aria-describedby={
              state.errors?.status ? `task-status-error-${task.id}` : undefined
            }
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          {state.errors?.status && (
            <p
              id={`task-status-error-${task.id}`}
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.status[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`task-priority-${task.id}`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>

          <select
            id={`task-priority-${task.id}`}
            name="priority"
            defaultValue={task.priority}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.priority)}
            aria-describedby={
              state.errors?.priority
                ? `task-priority-error-${task.id}`
                : undefined
            }
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          {state.errors?.priority && (
            <p
              id={`task-priority-error-${task.id}`}
              className="mt-1 text-sm text-red-600"
            >
              {state.errors.priority[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor={`task-date-${task.id}`}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Due Date
        </label>

        <input
          id={`task-date-${task.id}`}
          name="dueDate"
          type="date"
          defaultValue={dueDate}
          disabled={isPending}
          aria-invalid={Boolean(state.errors?.dueDate)}
          aria-describedby={
            state.errors?.dueDate ? `task-date-error-${task.id}` : undefined
          }
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
        />

        {state.errors?.dueDate && (
          <p
            id={`task-date-error-${task.id}`}
            className="mt-1 text-sm text-red-600"
          >
            {state.errors.dueDate[0]}
          </p>
        )}
      </div>

      {state.message && (
        <p
          aria-live="polite"
          className={`text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-gray-900"
        >
          {isPending ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
