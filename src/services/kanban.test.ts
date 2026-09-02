import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import { getKanbanTasks } from "./kanban";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    task: {
      findMany: vi.fn(),
    },
  },
}));

describe("getKanbanTasks", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns mappend Kanban tasks", async () => {
    vi.mocked(prisma.task.findMany).mockResolvedValue([
      {
        id: 1,
        title: "Build dashboard",
        status: "IN_PROGRESS",
        priority: "HIGH",
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
      {
        id: 2,
        title: "Fix filters",
        status: "TODO",
        priority: "MEDIUM",
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
    ] as never);

    const result = await getKanbanTasks();

    expect(result).toEqual([
      {
        id: 1,
        title: "Build dashboard",
        status: "IN_PROGRESS",
        priority: "HIGH",
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
      {
        id: 2,
        title: "Fix filters",
        status: "TODO",
        priority: "MEDIUM",
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
    ]);
  });

  it("returns an empty array when there are no tasks", async () => {
    vi.mocked(prisma.task.findMany).mockResolvedValue([]);

    const result = await getKanbanTasks();

    expect(result).toEqual([]);
  });
});
