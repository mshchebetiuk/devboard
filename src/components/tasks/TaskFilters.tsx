interface TaskFiltersProps {
  search: string;
  status: string;
}

export const TaskFilters = ({ search, status }: TaskFiltersProps) => {
  return (
    <form className="mt-8 flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        name="search"
        defaultValue={search}
        placeholder="Search tasks..."
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white sm:max-w-sm"
      />

      <select
        name="status"
        defaultValue={status}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
      >
        <option value="ALL">All statuses</option>
        <option value="TODO">Todo</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <button
        type="submit"
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
      >
        Apply
      </button>
    </form>
  );
};
