'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}

export default function ErrorPage({
    error,
    reset,
}: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-64 items-center justify-center">
            <div className="max-w-md text-center">
                <h2 className="text-2xl font-bld text-gray-900 dark:text-white">
                    Something went wrong
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    We couldn&apos;t load this part of DevBoard.
                </p>

                <button
                    type='button'
                    onClick={reset}
                    className='mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200'
                >
                    Try again
                </button>
            </div>
        </div>
    );
};