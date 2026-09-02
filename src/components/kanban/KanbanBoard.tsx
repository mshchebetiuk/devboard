"use client";

import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTaskStatus } from "@/actions/tasks";
import { fetchKanbanTasks } from "@/lib/api/kanban";
import { queryKeys } from "@/lib/query-keys";
import type { KanbanStatus, KanbanTask } from "@/types/kanban";

import { KanbanColumn } from "./KanbanColumn";
import { KanbanTaskCard } from "./KanbanTaskCard";

interface KanbanBoardProps {
  initialTasks: KanbanTask[];
}

const columns: {
  id: KanbanStatus;
  title: string;
}[] = [
  {
    id: "TODO",
    title: "Todo",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

export const KanbanBoard = ({ initialTasks }: KanbanBoardProps) => {
  const queryClient = useQueryClient();

  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);

  const {
    data: tasks = [],
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.kanban,
    queryFn: fetchKanbanTasks,
    initialData: initialTasks,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      taskId,
      status,
    }: {
      taskId: number;
      status: KanbanStatus;
    }) => updateTaskStatus(taskId, status),

    onMutate: async ({ taskId, status }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.kanban,
      });

      const previousTasks = queryClient.getQueryData<KanbanTask[]>(
        queryKeys.kanban,
      );

      queryClient.setQueryData<KanbanTask[]>(
        queryKeys.kanban,
        (oldTasks = []) =>
          oldTasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status,
                }
              : task,
          ),
      );

      return {
        previousTasks,
      };
    },

    onSuccess: () => {
      toast.success("Task status updated");
    },

    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.kanban, context.previousTasks);
      }

      toast.error("Failed to update task status");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.kanban,
      });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((task) => task.id === event.active.id);

    setActiveTask(task ?? null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    if (updateStatusMutation.isPending) return;

    const taskId = Number(active.id);
    const newStatus = over.id as KanbanStatus;

    if (!columns.some((column) => column.id === newStatus)) return;

    const task = tasks.find((task) => task.id === taskId);

    if (!task || task.status === newStatus) return;

    updateStatusMutation.mutate({
      taskId,
      status: newStatus,
    });
  };

  if (isError) {
    return (
      <p className="text-sm text-red-500">
        {error instanceof Error ? error.message : "Failed to load Kanban tasks"}
      </p>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={columnTasks}
            />
          );
        })}
      </div>

      <DragOverlay>
        {activeTask ? <KanbanTaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};
