import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectSearch } from "@/components/projects/ProjectSearch";
import { Pagination } from "@/components/ui/Pagination";

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

const PAGE_SIZE = 6;

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const search = params.search?.trim() ?? "";

  const where = search
    ? {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const [projects, totalProjects] = await Promise.all([
    prisma.project.findMany({
      where,

      select: {
        id: true,
        name: true,
        description: true,
        progress: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),

    prisma.project.count({
      where,
    }),
  ]);

  const totalPages = Math.max(Math.ceil(totalProjects / PAGE_SIZE), 1);

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
        <ProjectSearch defaultValue={search} />

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

        <Pagination page={page} totalPages={totalPages} search={search} />
      </div>
    </section>
  );
}
