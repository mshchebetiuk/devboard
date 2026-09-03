import type { ProjectOption } from "@/types/project";
import type { Task } from "@/types/task";

import { TaskCard } from "./TaskCard";

interface TasksListProps {
  tasks: Task[];
  projects: ProjectOption[];
}

export const TasksList = ({ tasks, projects }: TasksListProps) => {
  return (
    <div className="mt-8 space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} projects={projects} />
      ))}
    </div>
  );
};
