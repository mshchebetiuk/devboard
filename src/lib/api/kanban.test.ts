import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchKanbanTasks } from "./kanban";

describe("fetchKanbanTasks", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns Kanban tasks when request succeeds", async () => {
    const tasks = [
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
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(tasks), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const result = await fetchKanbanTasks();

    expect(fetch).toHaveBeenCalledWith("/api/kanban");
    expect(result).toEqual(tasks);
  });

  it("throws when request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 500,
      }),
    );

    await expect(fetchKanbanTasks()).rejects.toThrow(
      "Failed to fetch Kanban tasks",
    );
  });
});
