import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { PAGE_SIZE } from "@/constants/filters";
import { parseProjectProgress, parseProjectSort } from "@/lib/filters";
import { buildProjectOrderBy, buildProjectWhere } from "@/lib/queries/projects";

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

  const where = buildProjectWhere({
    search,
    progress,
  });

  const orderBy = buildProjectOrderBy(sort);

  const totalProjects = await prisma.project.count({
    where,
  });

  const totalPages = Math.max(Math.ceil(totalProjects / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);

  const projects = await prisma.project.findMany({
    where,

    select: {
      id: true,
      name: true,
      description: true,
      progress: true,
    },

    orderBy,

    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          Projects
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-300">
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
          page={page}
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
