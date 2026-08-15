export default function ProjectsLoading() {
  return (
    <section>
      <div>
        <div className="h-8 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          ></div>
        ))}
      </div>
    </section>
  );
}
