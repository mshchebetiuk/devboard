"use client";

interface ProjectsErrorProps {
  reset: () => void;
}

export default function ProjectsError({ reset }: ProjectsErrorProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Could not load projects
      </h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Something went wrong while loading data from the database.
      </p>

      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
      >
        Try again
      </button>
    </div>
  );
}
