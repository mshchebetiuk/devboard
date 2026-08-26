import type { TaskDto, KanbanTaskDto } from "@/types/dto";

interface TaskRow {
  id: number;
  title: string;
  status: TaskDto["status"];
  priority: TaskDto["priority"];
  dueDate: Date | null;
  project: {
    id: number;
    name: string;
  };
}

export const mapTaskToDto = (task: TaskRow): TaskDto => ({
  id: task.id,
  title: task.title,
  status: task.status,
  priority: task.priority,
  dueDate: task.dueDate?.toISOString() ?? null,
  project: {
    id: task.project.id,
    name: task.project.name,
  },
});

export const mapTaskToKanbanDto = (
  task: Omit<TaskRow, "dueDate">,
): KanbanTaskDto => ({
  id: task.id,
  title: task.title,
  status: task.status,
  priority: task.priority,
  project: {
    id: task.project.id,
    name: task.project.name,
  },
});
