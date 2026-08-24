export const PAGE_SIZE = 6;

export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export const TASK_SORT_OPTIONS = [
  "newest",
  "oldest",
  "priority",
  "dueDate",
] as const;

export const PROJECT_PROGRESS_FILTERS = [
  "ALL",
  "not-started",
  "in-progress",
  "completed",
] as const;

export const PROJECT_SORT_OPTIONS = [
  "newest",
  "oldest",
  "progress-high",
  "progress-low",
] as const;
