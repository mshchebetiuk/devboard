"use client";

import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

import type { Project } from "@/types/project";
import type { Task } from "@/types/task";
import type { KanbanTaskDto } from "@/types/dto";

interface KanbanCardProps {
  task: Task;
  project?: Project;
}

const priorityStyles: Record<KanbanTaskDto["priority"], string> = {
  LOW: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  MEDIUM:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  HIGH: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-950",
};

export const KanbanCard = ({ task, project }: KanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition active:cursor-grabbing dark:bg-gray-900 dark:border-gray-800 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-200">
          {task.title}
        </h3>
      </div>

      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyles[task.priority]}`}
      >
        {task.priority}
      </span>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-300">
        {project?.name ?? "Unknown project"}
      </p>

      <time
        dateTime={task.dueDate ?? undefined}
        className="mt-3 block text-xs text-gray-400"
      >
        Due {task.dueDate}
      </time>
    </article>
  );
};
