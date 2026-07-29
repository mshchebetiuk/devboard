interface EmptyStateProps {
    title: string;
    description: string;
}

export const EmptyState = ({
    title,
    description,
}: EmptyStateProps) => {
    return (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-900">
            <h3 className="font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
};