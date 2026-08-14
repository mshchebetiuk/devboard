export type KanbanStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface KanbanTask {
  id: number;
  title: string;
  status: KanbanStatus;
  priority: "LOW" | "MEDIUM" | "HIGH";

  project: {
    id: number;
    name: string;
  };
}
