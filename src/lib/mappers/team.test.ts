import { describe, expect, it } from "vitest";
import { mapUserToTeamMemberDto } from "./team";

describe("mapUserToTeamMemberDto", () => {
  it("maps online user and generates initials", () => {
    const user = {
      id: 1,
      name: "Maksym Shchebetiuk",
      email: "maksym@example.com",
      role: "DEVELOPER" as const,
      isOnline: true,
    };

    expect(mapUserToTeamMemberDto(user)).toEqual({
      id: 1,
      name: "Maksym Shchebetiuk",
      email: "maksym@example.com",
      role: "DEVELOPER",
      status: "online",
      initials: "MS",
    });
  });

  it("maps offline status", () => {
    const user = {
      id: 2,
      name: "Alex Doe",
      email: "alex@example.com",
      role: "DESIGNER" as const,
      isOnline: false,
    };

    expect(mapUserToTeamMemberDto(user).status).toBe("offline");
  });
});
