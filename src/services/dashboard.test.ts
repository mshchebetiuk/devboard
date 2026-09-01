import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import { getDashboardData } from "./dashboard";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    project: {
      findMany: vi.fn(),
      count: vi.fn(),
    },
    task: {
      count: vi.fn(),
    },
  },
}));

describe("getDashboardData", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns dashboard statistics", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([
      {
        id: 1,
        name: "DevBoard",
        description: "Project management app",
        progress: 80,
      },
    ] as never);

    vi.mocked(prisma.project.count).mockResolvedValue(4);

    vi.mocked(prisma.task.count)
      .mockResolvedValueOnce(20)
      .mockResolvedValueOnce(8)
      .mockResolvedValueOnce(7);

    const result = await getDashboardData();

    expect(result.totalProjects).toBe(4);
    expect(result.totalTasks).toBe(20);
    expect(result.completedTasks).toBe(8);
    expect(result.inProgressTasks).toBe(7);
  });

  it("returns recent projects", async () => {
    vi.mocked(prisma.project.findMany).mockResolvedValue([
      {
        id: 1,
        name: "DevBoard",
        description: "Project management app",
        progress: 80,
      },
    ] as never);

    vi.mocked(prisma.project.count).mockResolvedValue(1);

    vi.mocked(prisma.task.count)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(1);

    const result = await getDashboardData();

    expect(result.recentProjects).toHaveLength(1);

    expect(result.recentProjects[0]).toEqual({
      id: 1,
      name: "DevBoard",
      description: "Project management app",
      progress: 80,
    });
  });
});
