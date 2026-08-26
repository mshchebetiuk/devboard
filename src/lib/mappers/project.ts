import type { ProjectDto, ProjectOptionDto } from "@/types/dto";

interface ProjectRow {
  id: number;
  name: string;
  description: string;
  progress: number;
}

export const mapProjectToDto = (project: ProjectRow): ProjectDto => ({
  id: project.id,
  name: project.name,
  description: project.description,
  progress: project.progress,
});

export const mapProjectToOptionDto = (
  project: Pick<ProjectRow, "id" | "name">,
): ProjectOptionDto => ({
  id: project.id,
  name: project.name,
});
