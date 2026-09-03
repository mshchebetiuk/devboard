import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";
import { getKanbanTasks } from "@/services/kanban";

vi.mock("@/services/kanban", () => ({
  getKanbanTasks: vi.fn(),
}));

const mockedGetKanbanTasks = vi.mocked(getKanbanTasks);

describe("GET /api/kanban", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns Kanban tasks", async () => {
    mockedGetKanbanTasks.mockResolvedValue([
      {
        id: 1,
        title: "Build dashboard",
        status: "TODO",
        priority: "HIGH",
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
    ]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);

    expect(data).toEqual([
      {
        id: 1,
        title: "Build dashboard",
        status: "TODO",
        priority: "HIGH",
        project: {
          id: 1,
          name: "DevBoard",
        },
      },
    ]);

    expect(mockedGetKanbanTasks).toHaveBeenCalledOnce();
  });

  it("returns 500 when fetching Kanban tasks fails", async () => {
    mockedGetKanbanTasks.mockRejectedValue(new Error("Database error"));

    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      message: "Failed to fetch Kanban tasks",
    });
  });
});
