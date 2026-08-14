import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      progress: true,
    },

    orderBy: {
      createdAt: "desc",
    },
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
        <ProjectsList projects={projects} />
      </div>
    </section>
  );
}
