import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { TasksList } from "@/components/tasks/TasksList";
import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { Pagination } from "@/components/ui/Pagination";
import { TaskStatus } from "@prisma/client";

interface TaskPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sort?: string;
  }>;
}

const PAGE_SIZE = 6;

export default async function TasksPage({ searchParams }: TaskPageProps) {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const search = params.search?.trim() ?? "";
  const status = params.status ?? "ALL";
  const sort = params.sort ?? "newest";

  const taskStatus = Object.values(TaskStatus).includes(status as TaskStatus)
    ? (status as TaskStatus)
    : undefined;

  const where = {
    ...(search
      ? {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),

    ...(taskStatus
      ? {
          status: taskStatus,
        }
      : {}),
  };

  const orderBy =
    sort === "oldest"
      ? { creaetdAt: "asc" as const }
      : sort === "priority"
        ? { priority: "desc" as const }
        : sort === "dueDate"
          ? { dueDate: "asc" as const }
          : { createdAt: "desc" as const };

  const [totalTasks, projects] = await Promise.all([
    prisma.task.count({
      where,
    }),

    prisma.project.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  const totalPages = Math.max(Math.ceil(totalTasks / PAGE_SIZE), 1);
  const currentPage = Math.min(page, totalPages);

  const tasks = await prisma.task.findMany({
    where,

    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
      dueDate: true,

      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy,

    skip: (currentPage - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const serializedTasks = tasks.map((task) => ({
    ...task,
    dueDate: task.dueDate?.toISOString() ?? null,
  }));

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
          Tasks
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-300">
          Manage and track tasks across your projects.
        </p>
      </div>

      <div className="mt-8">
        <CreateTaskForm projects={projects} />
      </div>

      <TaskFilters search={search} status={status} sort={sort} />

      <div className="mt-8">
        {serializedTasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            description={
              search || taskStatus
                ? "Try changing your search or status filter."
                : "Create your first task to get started."
            }
          />
        ) : (
          <TasksList tasks={serializedTasks} projects={projects} />
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        pathname="/tasks"
        search={search}
        status={status}
        sort={sort}
      />
    </section>
  );
}
