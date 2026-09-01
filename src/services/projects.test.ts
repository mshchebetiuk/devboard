import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import { getProjects } from "./projects";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      count: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe("getProjects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns paginated projects", async () => {
    vi.mocked(prisma.project.count).mockResolvedValue(12);
    vi.mocked(prisma.project.findMany).mockResolvedValue([
      {
        id: 1,
        name: "DevBoard",
        description: "Project management app",
        progress: 75,
      },
      {
        id: 2,
        name: "Portfolio",
        description: "Developer portfolio",
        progress: 100,
      },
    ] as never);

    const result = await getProjects({
      page: 1,
      pageSize: 5,
      search: "",
      progress: "ALL",
      sort: "newest",
    });

    expect(result).toEqual({
      projects: [
        {
          id: 1,
          name: "DevBoard",
          description: "Project management app",
          progress: 75,
        },
        {
          id: 2,
          name: "Portfolio",
          description: "Developer portfolio",
          progress: 100,
        },
      ],
      totalProjects: 12,
      totalPages: 3,
      currentPage: 1,
    });
  });

  it("clamps page when requested page is too large", async () => {
    vi.mocked(prisma.project.count).mockResolvedValue(6);
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);

    const result = await getProjects({
      page: 10,
      pageSize: 5,
      search: "",
      progress: "ALL",
      sort: "newest",
    });

    expect(result.totalPages).toBe(2);
    expect(result.currentPage).toBe(2);
  });

  it("uses correct pagination values", async () => {
    vi.mocked(prisma.project.count).mockResolvedValue(20);
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);

    await getProjects({
      page: 2,
      pageSize: 5,
      search: "",
      progress: "ALL",
      sort: "newest",
    });

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 5,
        take: 5,
      }),
    );
  });

  it("pases search and progress filters to Prisma", async () => {
    vi.mocked(prisma.project.count).mockResolvedValue(1);
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);

    await getProjects({
      page: 1,
      pageSize: 5,
      search: "dashboard",
      progress: "in-progress",
      sort: "progress-high",
    });

    expect(prisma.project.count).toHaveBeenCalledWith({
      where: {
        name: {
          contains: "dashboard",
          mode: "insensitive",
        },
        progress: {
          gt: 0,
          lt: 100,
        },
      },
    });

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          name: {
            contains: "dashboard",
            mode: "insensitive",
          },
          progress: {
            gt: 0,
            lt: 100,
          },
        },
        orderBy: {
          progress: "desc",
        },
      }),
    );
  });
});
