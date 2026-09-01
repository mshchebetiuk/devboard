import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import { getAnalyticsData } from "./analytics";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      count: vi.fn(),
      aggregate: vi.fn(),
    },
    task: {
      count: vi.fn(),
    },
    user: {
      count: vi.fn(),
    },
  },
}));

describe("getAnalyticsData", () => {
  beforeEach(() => vi.resetAllMocks());

  it("calculates analytics statistics", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.project.count).mockResolvedValue(4);

    vi.mocked(prisma.task.count)
      .mockResolvedValueOnce(20)
      .mockResolvedValueOnce(8)
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(7);

    vi.mocked(prisma.user.count).mockResolvedValue(3);

    vi.mocked(prisma.project.aggregate).mockResolvedValue({
      _avg: {
        progress: 75,
      },
    } as never);

    const result = await getAnalyticsData();

    expect(result.totalProjects).toBe(4);
    expect(result.totalTasks).toBe(20);
    expect(result.teamMembers).toBe(3);

    expect(result.completionRate).toBe(40);
    expect(result.averageProjectProgress).toBe(75);

    expect(result.taskStats).toEqual({
      todo: 5,
      inProgress: 7,
      done: 8,
      total: 20,
    });
  });

  it("returns zero completion rate when there are no tasks", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.project.count).mockResolvedValue(0);

    vi.mocked(prisma.task.count)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0);

    vi.mocked(prisma.user.count).mockResolvedValue(0);

    vi.mocked(prisma.project.aggregate).mockResolvedValue({
      _avg: {
        progress: null,
      },
    } as never);

    const result = await getAnalyticsData();

    expect(result.completionRate).toBe(0);
    expect(result.averageProjectProgress).toBe(0);
  });

  it("builds task statistics", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([] as never);
    vi.mocked(prisma.project.count).mockResolvedValue(2);

    vi.mocked(prisma.task.count)
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(3);

    vi.mocked(prisma.user.count).mockResolvedValue(2);

    vi.mocked(prisma.project.aggregate).mockResolvedValue({
      _avg: {
        progress: null,
      },
    } as never);

    const result = await getAnalyticsData();

    expect(result.taskStats).toEqual({
      todo: 3,
      inProgress: 3,
      done: 4,
      total: 10,
    });
  });
});
