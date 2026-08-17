interface ProjectSearchProps {
  defaultValue?: string;
}

export const ProjectSearch = ({ defaultValue = "" }: ProjectSearchProps) => {
  return (
    <form className="mb-6 flex gap-2">
      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder="Search projects..."
        className="w-full max-w-sm rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
      />

      <button
        type="submit"
        className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
      >
        Search
      </button>
    </form>
  );
};
