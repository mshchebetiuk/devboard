import { describe, expect, it } from "vitest";

import { mapProjectToDto, mapProjectToOptionDto } from "./project";

describe("project mappers", () => {
  it("maps project to ProjectDto", () => {
    const project = {
      id: 1,
      name: "DevBoard",
      description: "Project management dashboard",
      progress: 65,
    };

    expect(mapProjectToDto(project)).toEqual({
      id: 1,
      name: "DevBoard",
      description: "Project management dashboard",
      progress: 65,
    });
  });

  it("maps project to ProjectOptionDto", () => {
    const project = {
      id: 1,
      name: "DevBoard",
    };

    expect(mapProjectToOptionDto(project)).toEqual({
      id: 1,
      name: "DevBoard",
    });
  });
});
