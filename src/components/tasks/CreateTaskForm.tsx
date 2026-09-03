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
    if (state.success) {
      toast.success("Task created successfully");
      formRef.current?.reset();
      return;
    }
    if (state.message) toast.error(state.message);
  }, [state]);

  const formRef = useRef<HTMLFormElement>(null);

  const fieldClassName =
    "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500";

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
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
            className={fieldClassName}
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
              className={fieldClassName}
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
              className={`${fieldClassName} dark:scheme-dark`}
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
              className={fieldClassName}
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
              className={fieldClassName}
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
        className="mt-5 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
      >
        {isPending ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};
