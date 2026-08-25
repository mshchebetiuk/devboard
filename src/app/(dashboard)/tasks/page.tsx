import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { TasksList } from "@/components/tasks/TasksList";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { Pagination } from "@/components/ui/Pagination";
import { PAGE_SIZE } from "@/constants/filters";
import { parseTaskSort, parseTaskStatus } from "@/lib/filters";
import { getTasks } from "@/services/tasks";

interface TaskPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function TasksPage({ searchParams }: TaskPageProps) {
  const params = await searchParams;

  const page = Math.max(Number(params.page) || 1, 1);
  const search = params.search?.trim() ?? "";

  const status = params.status ?? "ALL";
  const taskStatus = parseTaskStatus(params.status);
  const sort = parseTaskSort(params.sort);

  const { tasks, projects, totalPages, currentPage } = await getTasks({
    page,
    pageSize: PAGE_SIZE,
    search,
    status: taskStatus,
    sort,
  });

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
        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            description={
              search || taskStatus
                ? "Try changing your search or status filter."
                : "Create your first task to get started."
            }
          />
        ) : (
          <TasksList tasks={tasks} projects={projects} />
        )}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        pathname="/tasks"
        search={search}
        status={status}
        sort={sort}
      />
    </section>
  );
}
