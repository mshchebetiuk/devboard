interface TaskStats {
  todo: number;
  inProgress: number;
  done: number;
  total: number;
}

interface TaskStatusOverviewProps {
  stats: TaskStats;
}

const statuses = [
  {
    key: "todo",
    label: "Todo",
  },
  {
    key: "inProgress",
    label: "In Progress",
  },
  {
    key: "done",
    label: "Done",
  },
] as const;

export const TaskStatusOverview = ({ stats }: TaskStatusOverviewProps) => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Tasks by Status
      </h2>

      <div className="mt-6 space-y-5">
        {statuses.map(({ key, label }) => {
          const count = stats[key];

          const percentage =
            stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

          return (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {label}
                </span>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {count} ({percentage}%)
                </span>
              </div>

              <div
                className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
                role="progressbar"
                aria-label={`${label} tasks`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
              >
                <div
                  className="h-full rounded-full bg-gray-900 dark:bg-gray-300"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
