"use client";

import { useState } from "react";

import { deleteProject } from "@/actions/projects";
import { EditProjectForm } from "./EditProjectForm";

import type { Project } from "@/types/project";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import { toast } from "sonner";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isEditing) {
    return (
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Edit Project
        </h3>

        <EditProjectForm
          project={project}
          onCancel={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <>
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {project.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </p>

        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Progress</span>

            <span className="font-medium text-gray-900 dark:text-gray-100">
              {project.progress}%
            </span>
          </div>

          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-xl bg-gray-900 dark:bg-gray-100"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Edit
          </button>

          <form
            action={deleteProject}
            onSubmit={(event) => {
              const confirmed = window.confirm(`Delete "${project.name}"?`);

              if (!confirmed) event.preventDefault();
            }}
          >
            <input type="hidden" name="id" value={project.id} />

            <button
              type="button"
              onClick={() => setIsDeleteOpen(true)}
              className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </div>
      </article>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete project?"
        description={`Are you sure you want to delete "${project.name}"?`}
        isPending={isDeleting}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          setIsDeleting(true);

          const formData = new FormData();
          formData.set("id", String(project.id));

          try {
            await deleteProject(formData);
            setIsDeleteOpen(false);

            toast.success("Project deleted successfully");
          } catch (error) {
            console.error(error);
            toast.error("Failed to delete project");
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </>
  );
};
