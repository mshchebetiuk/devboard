import Link from "next/link";

interface ProjectFiltersProps {
  search: string;
  progress: string;
  sort: string;
}

export const ProjectFilters = ({
  search,
  progress,
  sort,
}: ProjectFiltersProps) => {
  const hasActiveFilters =
    Boolean(search) || progress !== "ALL" || sort !== "newest";

  const fieldClassName =
    "rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-500";

  return (
    <form className="mb-6 flex flex-col gap-3 lg:flex-row">
      <input
        type="search"
        name="search"
        defaultValue={search}
        placeholder="Search projects..."
        className={`w-full placeholder:text-gray-400 dark:placeholder:text-gray-500 lg:max-w-sm ${fieldClassName}`}
      />

      <select
        name="progress"
        defaultValue={progress}
        aria-label="Filter project by progress"
        className={fieldClassName}
      >
        <option value="ALL">All progress</option>
        <option value="not-started">Not started</option>
        <option value="in-progress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="sort"
        defaultValue={sort}
        aria-label="Sort projects"
        className={fieldClassName}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="progress-high">Progress: high to low</option>
        <option value="progress-low">Progress: low to high</option>
      </select>

      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"
      >
        Apply
      </button>

      {hasActiveFilters && (
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Reset
        </Link>
      )}
    </form>
  );
};
