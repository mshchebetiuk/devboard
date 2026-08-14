import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-500">404</p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
