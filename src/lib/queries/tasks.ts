import type { Prisma, TaskStatus } from "@prisma/client";

interface BuildTaskWhereOptions {
  search: string;
  status?: TaskStatus;
}

export const buildTaskWhere = ({
  search,
  status,
}: BuildTaskWhereOptions): Prisma.TaskWhereInput => {
  return {
    ...(search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {}),

    ...(status
      ? {
          status,
        }
      : {}),
  };
};

export const buildTaskOrderBy = (
  sort: string,
): Prisma.TaskOrderByWithRelationInput => {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" };
    case "priority":
      return { priority: "desc" };
    case "dueDate":
      return { dueDate: "asc" };
    default:
      return {
        createdAt: "desc",
      };
  }
};
