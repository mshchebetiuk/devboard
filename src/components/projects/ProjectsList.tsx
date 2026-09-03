import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectsList = ({ projects }: ProjectListProps) => {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
