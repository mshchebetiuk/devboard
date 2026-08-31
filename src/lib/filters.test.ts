import { describe, expect, it } from "vitest";

import {
  parseProjectProgress,
  parseProjectSort,
  parseTaskSort,
  parseTaskStatus,
} from "./filters";

describe("filter parsers", () => {
  describe("parseTaskStatus", () => {
    it("returns valid task status", () => {
      expect(parseTaskStatus("TODO")).toBe("TODO");
      expect(parseTaskStatus("IN_PROGRESS")).toBe("IN_PROGRESS");
      expect(parseTaskStatus("DONE")).toBe("DONE");
    });

    it("returns undefined for ALL", () => {
      expect(parseTaskStatus("ALL")).toBeUndefined();
    });

    it("returns undefined for invalid status", () => {
      expect(parseTaskStatus("INVALID")).toBeUndefined();
      expect(parseTaskStatus(undefined)).toBeUndefined();
    });
  });

  describe("parseTaskSort", () => {
    it("returns valid task sort", () => {
      expect(parseTaskSort("oldest")).toBe("oldest");
      expect(parseTaskSort("priority")).toBe("priority");
      expect(parseTaskSort("dueDate")).toBe("dueDate");
    });

    it("falls back to newest", () => {
      expect(parseTaskSort("invalid")).toBe("newest");
      expect(parseTaskSort(undefined)).toBe("newest");
    });
  });

  describe("parseProjectProgress", () => {
    it("returns valid progress filter", () => {
      expect(parseProjectProgress("not-started")).toBe("not-started");
      expect(parseProjectProgress("in-progress")).toBe("in-progress");
      expect(parseProjectProgress("completed")).toBe("completed");
      expect(parseProjectProgress("ALL")).toBe("ALL");
    });

    it("falls back to ALL", () => {
      expect(parseProjectProgress("invalid")).toBe("ALL");
      expect(parseProjectProgress(undefined)).toBe("ALL");
    });
  });

  describe("parseProjectSort", () => {
    it("returns valid project sort", () => {
      expect(parseProjectSort("oldest")).toBe("oldest");
      expect(parseProjectSort("progress-high")).toBe("progress-high");
      expect(parseProjectSort("progress-low")).toBe("progress-low");
    });

    it("falls back to newest", () => {
      expect(parseProjectSort("invalid")).toBe("newest");
      expect(parseProjectSort(undefined)).toBe("newest");
    });
  });
});
