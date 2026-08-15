export default function KanbanLoading() {
  return (
    <section>
      <div className="h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900"
          ></div>
        ))}
      </div>
    </section>
  );
}
