import type { KanbanTaskDto } from "@/types/dto";

export const fetchKanbanTasks = async (): Promise<KanbanTaskDto[]> => {
  const response = await fetch("/api/kanban");

  if (!response.ok) throw new Error("Failed to fetch Kanban tasks");

  return response.json();
};
