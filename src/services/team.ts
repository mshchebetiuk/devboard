import { prisma } from "@/lib/prisma";

import type { User } from "@/types/user";

export const getTeamMembers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isOnline: true,
    },

    orderBy: {
      name: "asc",
    },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.isOnline ? "online" : "offline",

    initials: user.name
      .split("")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  }));
};
