import type { Project } from "@/types/project";

interface ProjectProgressProps {
  projects: Project[];
}

export const ProjectProgress = ({ projects }: ProjectProgressProps) => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Project Progress
      </h2>

      <div className="mt-6 space-y-5">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                {project.name}
              </span>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {project.progress}%
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
              role="progressbar"
              aria-label={`${project.name} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={project.progress}
            >
              <div
                className="h-full rounded-full bg-gray-900 dark:bg-gray-300"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
