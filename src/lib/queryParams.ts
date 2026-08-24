interface BuildQueryParamsOptions {
  page?: number;
  search?: string;
  status?: string;
  progress?: string;
  sort?: string;
}

export const buildQueryParams = ({
  page,
  search,
  status,
  progress,
  sort,
}: BuildQueryParamsOptions) => {
  const params = new URLSearchParams();

  if (page && page > 1) params.set("page", String(page));
  if (search) params.set("search", search);
  if (status && status !== "ALL") params.set("status", status);
  if (progress && progress !== "ALL") params.set("progress", progress);
  if (sort && sort !== "newest") params.set("sort", sort);

  return params.toString();
};
