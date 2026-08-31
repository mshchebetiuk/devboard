import { describe, expect, it } from "vitest";

import { buildProjectOrderBy, buildProjectWhere } from "./projects";

describe("project query builders", () => {
  describe("buildProjectWhere", () => {
    it("returns empty where without filters", () => {
      expect(
        buildProjectWhere({
          search: "",
          progress: "ALL",
        }),
      ).toEqual({});
    });

    it("builds search filter", () => {
      expect(
        buildProjectWhere({
          search: "DevBoard",
          progress: "ALL",
        }),
      ).toEqual({
        name: {
          contains: "DevBoard",
          mode: "insensitive",
        },
      });
    });

    it("builds not-started progress filter", () => {
      expect(
        buildProjectWhere({
          search: "",
          progress: "not-started",
        }),
      ).toEqual({
        progress: 0,
      });
    });

    it("builds in-progress filter", () => {
      expect(
        buildProjectWhere({
          search: "",
          progress: "in-progress",
        }),
      ).toEqual({
        progress: {
          gt: 0,
          lt: 100,
        },
      });
    });

    it("builds completed filter", () => {
      expect(
        buildProjectWhere({
          search: "",
          progress: "completed",
        }),
      ).toEqual({
        progress: 100,
      });
    });

    it("combines search and progress filters", () => {
      expect(
        buildProjectWhere({
          search: "dashboard",
          progress: "completed",
        }),
      ).toEqual({
        name: {
          contains: "dashboard",
          mode: "insensitive",
        },
        progress: 100,
      });
    });
  });

  describe("buildProjectOrderBy", () => {
    it("sorts by newest by default", () => {
      expect(buildProjectOrderBy("newest")).toEqual({
        createdAt: "desc",
      });
    });

    it("sorts by oldest", () => {
      expect(buildProjectOrderBy("oldest")).toEqual({
        createdAt: "asc",
      });
    });

    it("sorts by highest progress", () => {
      expect(buildProjectOrderBy("progress-high")).toEqual({
        progress: "desc",
      });
    });

    it("sorts by lowest progress", () => {
      expect(buildProjectOrderBy("progress-low")).toEqual({
        progress: "asc",
      });
    });
  });
});
