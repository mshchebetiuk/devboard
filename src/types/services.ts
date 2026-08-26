import type { ProjectDto, ProjectOptionDto, TaskDto } from "@/types/dto";

export interface GetProjectsResult {
  projects: ProjectDto[];
  totalProjects: number;
  totalPages: number;
  currentPage: number;
}

export interface GetTasksResult {
  tasks: TaskDto[];
  projects: ProjectOptionDto[];
  totalTasks: number;
  totalPages: number;
  currentPage: number;
}
