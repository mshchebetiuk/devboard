import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { queryKeys } from "@/lib/query-keys";

import { fetchKanbanTasks } from "@/lib/api/kanban";
import type { KanbanTask } from "@/types/kanban";
import { useKanbanTasks } from "./use-kanban-tasks";

vi.mock("@/lib/api/kanban", () => ({
  fetchKanbanTasks: vi.fn(),
}));

const mockedFetchKanbanTasks = vi.mocked(fetchKanbanTasks);

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

describe("useKanbanTasks", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.resetAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("uses initial tasks", () => {
    const { result } = renderHook(() => useKanbanTasks(initialTasks), {
      wrapper,
    });

    expect(result.current.data).toEqual(initialTasks);
  });

  it("refetches Kanban tasks", async () => {
    const updatedTasks: KanbanTask[] = [
      {
        ...initialTasks[0],
        status: "DONE",
      },
    ];

    mockedFetchKanbanTasks.mockResolvedValue(updatedTasks);

    const { result } = renderHook(() => useKanbanTasks(initialTasks), {
      wrapper,
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(queryClient.getQueryData<KanbanTask[]>(queryKeys.kanban)).toEqual(
      updatedTasks,
    );

    expect(mockedFetchKanbanTasks).toHaveBeenCalled();
  });
});
