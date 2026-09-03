import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { PAGE_SIZE } from "@/constants/filters";
import { parseProjectProgress, parseProjectSort } from "@/lib/filters";
import { getProjects } from "@/services/projects";

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    progress?: string;
    sort?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const search = params.search?.trim() ?? "";
  const progress = parseProjectProgress(params.progress);
  const sort = parseProjectSort(params.sort);

  const { projects, totalPages, currentPage } = await getProjects({
    page,
    pageSize: PAGE_SIZE,
    search,
    progress,
    sort,
  });

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Projects
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Manage and track all your projects.
        </p>
      </div>

      <div className="mt-8">
        <CreateProjectForm />
      </div>

      <div className="mt-8">
        <ProjectFilters search={search} progress={progress} sort={sort} />

        {projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            description={
              search
                ? "Try searching for another project."
                : "Create your first project to get started."
            }
          />
        ) : (
          <ProjectsList projects={projects} />
        )}

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          pathname="/projects"
          search={search}
          progress={progress}
          sort={sort}
        />
      </div>
    </section>
  );
}
