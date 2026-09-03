"use client";

import { useState } from "react";

import { deleteTask } from "@/actions/tasks";

import type { ProjectOption } from "@/types/project";
import type { Task } from "@/types/task";

import { EditTaskForm } from "./EditTaskForm";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  projects: ProjectOption[];
}

const formatStatus = (status: Task["status"]) => {
  switch (status) {
    case "TODO":
      return "Todo";
    case "IN_PROGRESS":
      return "In Progress";
    case "DONE":
      return "Done";
  }
};

const formatPriority = (priority: Task["priority"]) => {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
};

export const TaskCard = ({ task, projects }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isEditing) {
    return (
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
          Edit Task
        </h3>

        <EditTaskForm
          task={task}
          projects={projects}
          onCancel={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <>
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {task.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {task.project.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="flex items-center rounded-xl bg-gray-100 px-3 py-0.5 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
              {formatStatus(task.status)}
            </span>

            <span className="flex items-center rounded-xl bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-800 dark:text-gray-200">
              {formatPriority(task.priority)}
            </span>
          </div>
        </div>

        {task.dueDate && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Due: {new Date(task.dueDate).toLocaleDateString("en-GB")}
          </p>
        )}

        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </article>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Delete task?"
        description={`Are you sure you want to delete "${task.title}"?`}
        isPending={isDeleting}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          setIsDeleting(true);

          const formData = new FormData();
          formData.set("id", String(task.id));

          try {
            await deleteTask(formData);
            setIsDeleteOpen(false);

            toast.success("Task deleted successfully");
          } catch (error) {
            console.error(error);
            toast.error("Failed to delete task");
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </>
  );
};
