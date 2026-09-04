import Link from "next/link";
import { buildQueryParams } from "@/lib/queryParams";

interface PaginationProps {
  page: number;
  totalPages: number;
  pathname: string;
  search?: string;
  status?: string;
  progress?: string;
  sort?: string;
}

export const Pagination = ({
  page,
  totalPages,
  pathname,
  search = "",
  status = "",
  progress = "",
  sort = "",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const createHref = (nextPage: number) => {
    const query = buildQueryParams({
      page: nextPage,
      search,
      status,
      progress,
      sort,
    });

    return query ? `${pathname}?${query}` : pathname;
  };

  const linkClassName =
    "rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link href={createHref(page - 1)} className={linkClassName}>
          Previous
        </Link>
      ) : (
        <span />
      )}

      <span className="text-sm text-gray-500 dark:text-gray-400">
        Page {page} of {totalPages}
      </span>

      {page < totalPages ? (
        <Link href={createHref(page + 1)} className={linkClassName}>
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
};
