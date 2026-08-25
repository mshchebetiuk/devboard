import { prisma } from "@/lib/prisma";

import { buildProjectOrderBy, buildProjectWhere } from "@/lib/queries/projects";

interface GetProjectsOptions {
  page: number;
  pageSize: number;
  search: string;
  progress: string;
  sort: string;
}

export const getProjects = async ({
  page,
  pageSize,
  search,
  progress,
  sort,
}: GetProjectsOptions) => {
  const where = buildProjectWhere({
    search,
    progress,
  });

  const orderBy = buildProjectOrderBy(sort);

  const totalProjects = await prisma.project.count({
    where,
  });

  const totalPages = Math.max(Math.ceil(totalProjects / pageSize), 1);

  const currentPage = Math.min(page, totalPages);

  const projects = await prisma.project.findMany({
    where,

    select: {
      id: true,
      name: true,
      description: true,
      progress: true,
    },

    orderBy,

    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return {
    projects,
    totalProjects,
    totalPages,
    currentPage,
  };
};
