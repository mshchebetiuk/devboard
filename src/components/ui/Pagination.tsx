import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  search?: string;
}

export const Pagination = ({
  page,
  totalPages,
  search = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const createHref = (nextPage: number) => {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));

    if (search) params.set("search", search);

    return `/projects?${params.toString()}`;
  };

  return (
    <nav
      aria-label="Projects pagination"
      className="mt-8 flex items-center justify-between"
    >
      {page > 1 ? (
        <Link
          href={createHref(page - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
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
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};
