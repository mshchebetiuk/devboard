import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  pathname: string;
  search?: string;
  status?: string;
}

export const Pagination = ({
  page,
  totalPages,
  pathname,
  search = "",
  status = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const createHref = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));

    if (search) params.set("search", search);

    if (status && status !== "ALL") params.set("status", status);

    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link
          href={createHref(page - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Previous
        </Link>
      ) : (
        <span />
      )}

      <span className="text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={createHref(page + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};
