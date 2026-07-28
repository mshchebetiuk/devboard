interface StatsCardProps {
    title: string;
    value: number;
    description?: string;
}

export const StatsCard = ({
    title,
    value,
    description,
}: StatsCardProps) => {
    return (
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-gray-950 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-200">
                {title}
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-300">
                {value}
            </p>

            {description && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                    {description}
                </p>
            )}
        </article>
    );
};