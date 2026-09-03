import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateTaskStatus } from "@/actions/tasks";
import { queryKeys } from "@/lib/query-keys";
import type { KanbanStatus, KanbanTask } from "@/types/kanban";

type UpdateTaskStatusVariables = {
  taskId: number;
  status: KanbanStatus;
};

export const useKanbanStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: UpdateTaskStatusVariables) =>
      updateTaskStatus(taskId, status),

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
      if (context?.previousTasks)
        queryClient.setQueryData(queryKeys.kanban, context.previousTasks);

      toast.error("Failed to update task status");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.kanban,
      });
    },
  });
};
