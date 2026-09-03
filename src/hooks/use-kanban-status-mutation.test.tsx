import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { updateTaskStatus } from "@/actions/tasks";
import { queryKeys } from "@/lib/query-keys";
import type { KanbanTask } from "@/types/kanban";
import { useKanbanStatusMutation } from "./use-kanban-status-mutation";

vi.mock("@/actions/tasks", () => ({
  updateTaskStatus: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockedUpdateTaskStatus = vi.mocked(updateTaskStatus);

const initialTasks: KanbanTask[] = [
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

describe("useKanbanStatusMutation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.resetAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

    queryClient.setQueryData(queryKeys.kanban, initialTasks);
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("optimistically updates task status", async () => {
    mockedUpdateTaskStatus.mockResolvedValue(undefined);

    const { result } = renderHook(() => useKanbanStatusMutation(), { wrapper });

    act(() => {
      result.current.mutate({
        taskId: 1,
        status: "IN_PROGRESS",
      });
    });

    await waitFor(() => {
      const tasks = queryClient.getQueryData<KanbanTask[]>(queryKeys.kanban);

      expect(tasks?.[0].status).toBe("IN_PROGRESS");
    });
  });

  it("rolls back task status when mutation fails", async () => {
    mockedUpdateTaskStatus.mockRejectedValue(new Error("Database error"));

    const { result } = renderHook(() => useKanbanStatusMutation(), { wrapper });

    act(() => {
      result.current.mutate({
        taskId: 1,
        status: "DONE",
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    const tasks = queryClient.getQueryData<KanbanTask[]>(queryKeys.kanban);

    expect(tasks?.[0].status).toBe("TODO");
  });
});
