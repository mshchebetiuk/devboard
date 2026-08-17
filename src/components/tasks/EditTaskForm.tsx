"use client";

import { useActionState, useEffect } from "react";

import { updateTask, type TaskActionState } from "@/actions/tasks";

import type { ProjectOption } from "@/types/project";
import type { Task } from "@/types/task";
import { toast } from "sonner";
import { FormField } from "@/components/ui/FormField";

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
        <FormField
          label="Title"
          htmlFor={`task-title-${task.id}`}
          error={state.errors?.title?.[0]}
        >
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
        </FormField>
      </div>

      <div>
        <FormField
          label="Project"
          htmlFor={`task-project-${task.id}`}
          error={state.errors?.projectId?.[0]}
        >
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
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FormField
            label="Status"
            htmlFor={`task-status-${task.id}`}
            error={state.errors?.status?.[0]}
          >
            <select
              id={`task-status-${task.id}`}
              name="status"
              defaultValue={task.status}
              disabled={isPending}
              aria-invalid={Boolean(state.errors?.status)}
              aria-describedby={
                state.errors?.status
                  ? `task-status-error-${task.id}`
                  : undefined
              }
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </FormField>
        </div>

        <div>
          <FormField
            label="Priority"
            htmlFor={`task-priority-${task.id}`}
            error={state.errors?.priority?.[0]}
          >
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
          </FormField>
        </div>
      </div>

      <div>
        <FormField
          label="Due Date"
          htmlFor={`task-date-${task.id}`}
          error={state.errors?.dueDate?.[0]}
        >
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
        </FormField>
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
