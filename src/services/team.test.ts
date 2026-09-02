import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "@/lib/prisma";
import { getTeamMembers } from "./team";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
    },
  },
}));

describe("getTeamMembers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns mapped team members", async () => {
    vi.mocked(prisma.user.findMany).mockResolvedValue([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "DEVELOPER",
        isOnline: true,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "DESIGNER",
        isOnline: false,
      },
    ] as never);

    const result = await getTeamMembers();

    expect(result).toEqual([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "DEVELOPER",
        status: "online",
        initials: "JD",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "DESIGNER",
        status: "offline",
        initials: "JS",
      },
    ]);
  });

  it("returns an empty array when there are no users", async () => {
    vi.mocked(prisma.user.findMany).mockResolvedValue([]);

    const result = await getTeamMembers();
    expect(result).toEqual([]);
  });
});
