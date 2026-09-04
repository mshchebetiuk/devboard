"use client";

import type { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { KanbanTask } from "@/types/kanban";

interface KanbanTaskCardProps {
  task: KanbanTask;
  isOverlay?: boolean;
}

const formatPriority = (priority: KanbanTask["priority"]) => {
  return priority.charAt(0) + priority.slice(1).toLowerCase();
};

export const KanbanTaskCard = ({
  task,
  isOverlay = false,
}: KanbanTaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      disabled: isOverlay,
    });

  const style: CSSProperties | undefined = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-950 ${
        isDragging ? "opacity-40" : ""
      } ${isOverlay ? "cursor-grabbing shadow-lg" : ""}`}
    >
      <h4 className="font-medium text-gray-900 dark:text-gray-100">
        {task.title}
      </h4>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {task.project.name}
      </p>

      <div className="mt-3">
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {formatPriority(task.priority)}
        </span>
      </div>
    </article>
  );
};
