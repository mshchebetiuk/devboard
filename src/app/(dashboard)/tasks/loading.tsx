export default function TasksLoading() {
  return (
    <section>
      <div className="h-8 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

      <div className="mt-8 space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          ></div>
        ))}
      </div>
    </section>
  );
}
