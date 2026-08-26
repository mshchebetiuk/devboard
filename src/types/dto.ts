export interface ProjectDto {
  id: number;
  name: string;
  description: string;
  progress: number;
}

export interface ProjectOptionDto {
  id: number;
  name: string;
}

export type TaskStatusDto = "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriorityDto = "LOW" | "MEDIUM" | "HIGH";

export interface TaskDto {
  id: number;
  title: string;
  status: TaskStatusDto;
  priority: TaskPriorityDto;
  dueDate: string | null;

  project: ProjectOptionDto;
}

export interface KanbanTaskDto {
  id: number;
  title: string;
  status: TaskStatusDto;
  priority: TaskPriorityDto;

  project: ProjectOptionDto;
}

export type UserStatusDto = "online" | "offline";
export type UserRoleDto = "OWNER" | "DEVELOPER" | "DESIGNER";

export interface TeamMemberDto {
  id: number;
  name: string;
  email: string;
  role: UserRoleDto;
  status: UserStatusDto;
  initials: string;
}
