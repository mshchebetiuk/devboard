export default function Loading() {
    return (
        <div 
            className="flex min-h-64 items-center justify-center"
            role="status"    
            aria-live="polite"
        >
            <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Loading...
                </p>
            </div>
        </div>
    )
}