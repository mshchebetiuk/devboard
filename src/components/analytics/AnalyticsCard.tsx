interface AnalyticsCardProps {
  title: string;
  value: number | string;
  description: string;
}

export const AnalyticsCard = ({
  title,
  value,
  description,
}: AnalyticsCardProps) => {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-200">
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {description}
      </p>
    </article>
  );
};
