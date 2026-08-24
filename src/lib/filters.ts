import { TaskStatus } from "@prisma/client";

import {
  PROJECT_PROGRESS_FILTERS,
  PROJECT_SORT_OPTIONS,
  TASK_SORT_OPTIONS,
} from "@/constants/filters";

export const parseTaskStatus = (
  value: string | undefined,
): TaskStatus | undefined => {
  if (!value || value === "ALL") return undefined;

  return Object.values(TaskStatus).includes(value as TaskStatus)
    ? (value as TaskStatus)
    : undefined;
};

export const parseTaskSort = (value: string | undefined) => {
  return TASK_SORT_OPTIONS.includes(value as (typeof TASK_SORT_OPTIONS)[number])
    ? (value as (typeof TASK_SORT_OPTIONS)[number])
    : "newest";
};

export const parseProjectProgress = (value: string | undefined) => {
  return PROJECT_PROGRESS_FILTERS.includes(
    value as (typeof PROJECT_PROGRESS_FILTERS)[number],
  )
    ? (value as (typeof PROJECT_PROGRESS_FILTERS)[number])
    : "ALL";
};

export const parseProjectSort = (value: string | undefined) => {
  return PROJECT_SORT_OPTIONS.includes(
    value as (typeof PROJECT_SORT_OPTIONS)[number],
  )
    ? (value as (typeof PROJECT_SORT_OPTIONS)[number])
    : "newest";
};
