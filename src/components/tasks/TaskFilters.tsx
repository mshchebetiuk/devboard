import Link from "next/link";

interface TaskFiltersProps {
  search: string;
  status: string;
  sort: string;
}

export const TaskFilters = ({ search, status, sort }: TaskFiltersProps) => {
  const hasActiveFilters =
    Boolean(search) || status !== "ALL" || sort !== "newest";

  const fieldClassName =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500";

  return (
    <form className="mt-8 flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        name="search"
        defaultValue={search}
        placeholder="Search tasks..."
        className={`w-full placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:max-w-sm ${fieldClassName}`}
      />

      <select name="status" defaultValue={status} className={fieldClassName}>
        <option value="ALL">All statuses</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <select
        name="sort"
        defaultValue={sort}
        aria-label="Sort tasks"
        className={fieldClassName}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>

      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
      >
        Apply
      </button>

      {hasActiveFilters && (
        <Link
          href="/tasks"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Reset
        </Link>
      )}
    </form>
  );
};
