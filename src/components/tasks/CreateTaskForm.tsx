"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { createTask, type TaskActionState } from "@/actions/tasks";

import type { ProjectOption } from "@/types/project";
import { FormField } from "@/components/ui/FormField";

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

  useEffect(() => {
    if (state.success) toast.success("Task created successfully");
    if (state.message && !state.success) toast.error(state.message);
  }, [state]);

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
        <FormField
          label="Title"
          htmlFor="task-title"
          error={state.errors?.title?.[0]}
        >
          <input
            id="task-title"
            name="title"
            type="text"
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.title)}
            aria-describedby={
              state.errors?.title ? "task-title-error" : undefined
            }
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          />
        </FormField>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <FormField
            label="Project"
            htmlFor="task-project"
            error={state.errors?.projectId?.[0]}
          >
            <select
              id="task-project"
              name="projectId"
              defaultValue=""
              disabled={isPending}
              aria-invalid={Boolean(state.errors?.projectId)}
              aria-describedby={
                state.errors?.projectId ? "task-project-error" : undefined
              }
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
          </FormField>
        </div>

        <div>
          <FormField
            label="Due Date"
            htmlFor="task-due-date"
            error={state.errors?.dueDate?.[0]}
          >
            <input
              id="task-due-date"
              name="dueDate"
              type="date"
              disabled={isPending}
              aria-invalid={Boolean(state.errors?.dueDate)}
              aria-describedby={
                state.errors?.dueDate ? "task-due-date-error" : undefined
              }
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            />
          </FormField>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <FormField
            label="Status"
            htmlFor="task-status"
            error={state.errors?.status?.[0]}
          >
            <select
              id="task-status"
              name="status"
              defaultValue="TODO"
              disabled={isPending}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-300 dark:bg-gray-950"
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
            htmlFor="task-priority"
            error={state.errors?.priority?.[0]}
          >
            <select
              id="task-priority"
              name="priority"
              defaultValue="MEDIUM"
              disabled={isPending}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </FormField>
        </div>
      </div>

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
