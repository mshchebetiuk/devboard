import type { Prisma } from "@prisma/client";

interface BuildProjectWhereOptions {
  search: string;
  progress: string;
}

export const buildProjectWhere = ({
  search,
  progress,
}: BuildProjectWhereOptions): Prisma.ProjectWhereInput => {
  return {
    ...(search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {}),

    ...(progress === "not-started"
      ? {
          progress: 0,
        }
      : progress === "in-progress"
        ? {
            progress: {
              gt: 0,
              lt: 100,
            },
          }
        : progress === "completed"
          ? {
              progress: 100,
            }
          : {}),
  };
};

export const buildProjectOrderBy = (
  sort: string,
): Prisma.ProjectOrderByWithRelationInput => {
  switch (sort) {
    case "oldest":
      return {
        createdAt: "asc",
      };

    case "progress-high":
      return {
        progress: "desc",
      };

    case "progress-low":
      return {
        progress: "asc",
      };

    default:
      return {
        createdAt: "desc",
      };
  }
};
