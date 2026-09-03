"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { createProject, type ProjectActionState } from "@/actions/projects";
import { FormField } from "@/components/ui/FormField";

const initialState: ProjectActionState = {
  success: false,
  message: "",
};

export const CreateProjectForm = () => {
  const [state, formAction, isPending] = useActionState(
    createProject,
    initialState,
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Project created successfully");
      formRef.current?.reset();
      return;
    }
    if (state.message && !state.success) toast.error(state.message);
  }, [state]);

  const inputClassName =
    "mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500";

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Create Project
      </h2>

      <div className="mt-5">
        <FormField label="Name" htmlFor="name" error={state.errors?.name?.[0]}>
          <input
            id="name"
            name="name"
            type="text"
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="mt-4">
        <FormField
          label="Description"
          htmlFor="description"
          error={state.errors?.description?.[0]}
        >
          <textarea
            name="description"
            id="description"
            rows={4}
            disabled={isPending}
            aria-invalid={Boolean(state.errors?.description)}
            aria-describedby={
              state.errors?.description ? "description-error" : undefined
            }
            className={`${inputClassName} resize-none`}
          />
        </FormField>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
      >
        {isPending ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};
