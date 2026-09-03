import { useQuery } from "@tanstack/react-query";

import { fetchKanbanTasks } from "@/lib/api/kanban";
import { queryKeys } from "@/lib/query-keys";
import type { KanbanTask } from "@/types/kanban";

export const useKanbanTasks = (initialTasks: KanbanTask[]) => {
  return useQuery({
    queryKey: queryKeys.kanban,
    queryFn: fetchKanbanTasks,
    initialData: initialTasks,
  });
};
