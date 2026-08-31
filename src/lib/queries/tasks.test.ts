import { describe, expect, it } from "vitest";

import { buildTaskOrderBy, buildTaskWhere } from "./tasks";

describe("task query builders", () => {
  describe("buildTaskWhere", () => {
    it("returns empty where without filters", () => {
      expect(
        buildTaskWhere({
          search: "",
          status: undefined,
        }),
      ).toEqual({});
    });

    it("builds search filter", () => {
      expect(
        buildTaskWhere({
          search: "dashboard",
          status: undefined,
        }),
      ).toEqual({
        title: {
          contains: "dashboard",
          mode: "insensitive",
        },
      });
    });

    it("build status fitler", () => {
      expect(
        buildTaskWhere({
          search: "",
          status: "TODO",
        }),
      ).toEqual({
        status: "TODO",
      });
    });

    it("combines search and status", () => {
      expect(
        buildTaskWhere({
          search: "API",
          status: "IN_PROGRESS",
        }),
      ).toEqual({
        title: {
          contains: "API",
          mode: "insensitive",
        },
        status: "IN_PROGRESS",
      });
    });
  });

  describe("buildTaskOrderBy", () => {
    it("sorts by newest by default", () => {
      expect(buildTaskOrderBy("newest")).toEqual({
        createdAt: "desc",
      });
    });

    it("sorts by oldest", () => {
      expect(buildTaskOrderBy("oldest")).toEqual({
        createdAt: "asc",
      });
    });

    it("sorts by priority", () => {
      expect(buildTaskOrderBy("priority")).toEqual({
        priority: "desc",
      });
    });

    it("sorts by due date", () => {
      expect(buildTaskOrderBy("dueDate")).toEqual({
        dueDate: "asc",
      });
    });
  });
});
