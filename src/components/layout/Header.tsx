export const Header = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
            <h1 className="text-sl font-semibold dark:text-gray-200">Dashboard</h1>

            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white dark:text-gray-200 dark:bg-gray-600">
                    MS
                </div>

                <span className="font-medium text-gray-900 dark:text-gray-200">
                    Maksym
                </span>
            </div>
        </header>
    )
}