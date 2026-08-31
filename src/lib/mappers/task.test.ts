import { describe, expect, it } from "vitest";

import { mapTaskToDto, mapTaskToKanbanDto } from "./task";

describe("mapTaskToDto", () => {
  it("maps task data to TaskDto", () => {
    const task = {
      id: 1,
      title: "Build analytics page",
      status: "IN_PROGRESS" as const,
      priority: "HIGH" as const,
      dueDate: new Date("2026-08-31T12:00:00.000Z"),
      project: {
        id: 10,
        name: "DevBoard",
      },
    };

    const result = mapTaskToDto(task);

    expect(result).toEqual({
      id: 1,
      title: "Build analytics page",
      status: "IN_PROGRESS",
      priority: "HIGH",
      dueDate: "2026-08-31T12:00:00.000Z",
      project: {
        id: 10,
        name: "DevBoard",
      },
    });
  });

  it("returns null when dueDate is null", () => {
    const task = {
      id: 2,
      title: "Fix Kanban card",
      status: "TODO" as const,
      priority: "MEDIUM" as const,
      dueDate: null,
      project: {
        id: 10,
        name: "DevBoard",
      },
    };

    const result = mapTaskToDto(task);
    expect(result.dueDate).toBeNull();
  });
});

describe("mapTaskToKanbanDto", () => {
  it("maps task to KanbanTaskDto", () => {
    const task = {
      id: 3,
      title: "Implement drag and drop",
      status: "DONE" as const,
      priority: "HIGH" as const,
      project: {
        id: 1,
        name: "DevBoard",
      },
    };

    expect(mapTaskToKanbanDto(task)).toEqual({
      id: 3,
      title: "Implement drag and drop",
      status: "DONE",
      priority: "HIGH",
      project: {
        id: 1,
        name: "DevBoard",
      },
    });
  });
});
