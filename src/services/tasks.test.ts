import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import { getTasks } from "./tasks";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    task: {
      count: vi.fn(),
      findMany: vi.fn(),
    },
    project: {
      findMany: vi.fn(),
    },
  },
}));

describe("getTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns tasks, project option and pagination data", async () => {
    vi.mocked(prisma.task.count).mockResolvedValue(12);
    vi.mocked(prisma.project.findMany).mockResolvedValue([
      {
        id: 1,
        name: "DevBoard",
      },
      {
        id: 2,
        name: "Portfolio",
      },
    ] as never);

    vi.mocked(prisma.task.findMany).mockResolvedValue([
      {
        id: 1,
        title: "Build dashboard",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-09-10T12:00:00.000Z"),
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
    ] as never);

    const result = await getTasks({
      page: 1,
      pageSize: 5,
      search: "",
      status: undefined,
      sort: "newest",
    });

    expect(result).toEqual({
      tasks: [
        {
          id: 1,
          title: "Build dashboard",
          status: "IN_PROGRESS",
          priority: "HIGH",
          dueDate: "2026-09-10T12:00:00.000Z",
          project: {
            id: 1,
            name: "DevBoard",
          },
        },
      ],
      projects: [
        {
          id: 1,
          name: "DevBoard",
        },
        {
          id: 2,
          name: "Portfolio",
        },
      ],
      totalTasks: 12,
      totalPages: 3,
      currentPage: 1,
    });
  });

  it("clamps page when requested page exceeds total pages", async () => {
    vi.mocked(prisma.task.count).mockResolvedValue(6);
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.task.findMany).mockResolvedValue([] as never);

    const result = await getTasks({
      page: 10,
      pageSize: 5,
      search: "",
      status: undefined,
      sort: "newest",
    });

    expect(result.totalPages).toBe(2);
    expect(result.currentPage).toBe(2);
  });

  it("uses correct pagination values", async () => {
    vi.mocked(prisma.task.count).mockResolvedValue(20);
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.task.findMany).mockResolvedValue([] as never);

    await getTasks({
      page: 3,
      pageSize: 5,
      search: "",
      status: undefined,
      sort: "newest",
    });

    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 10,
        take: 5,
      }),
    );
  });

  it("passes search and staus filters to Prisma", async () => {
    vi.mocked(prisma.task.count).mockResolvedValue(1);
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.task.findMany).mockResolvedValue([] as never);

    await getTasks({
      page: 1,
      pageSize: 5,
      search: "dashboard",
      status: "IN_PROGRESS",
      sort: "oldest",
    });

    const expectedWhere = {
      title: {
        contains: "dashboard",
        mode: "insensitive",
      },
      status: "IN_PROGRESS",
    };

    expect(prisma.task.count).toHaveBeenCalledWith({
      where: expectedWhere,
    });

    expect(prisma.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expectedWhere,
        orderBy: {
          createdAt: "asc",
        },
      }),
    );
  });

  it("maps null dueDate correctly", async () => {
    vi.mocked(prisma.task.count).mockResolvedValue(1);
    vi.mocked(prisma.project.findMany).mockResolvedValue([
      {
        id: 1,
        name: "DevBoard",
      },
    ] as never);

    vi.mocked(prisma.task.findMany).mockResolvedValue([
      {
        id: 2,
        title: "Fix filters",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: null,
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
    ] as never);

    const result = await getTasks({
      page: 1,
      pageSize: 5,
      search: "",
      status: undefined,
      sort: "newest",
    });

    expect(result.tasks[0].dueDate).toBeNull();
  });
});
