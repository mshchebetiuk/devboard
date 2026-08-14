import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const devBoard = await prisma.project.create({
    data: {
      name: "DevBoard",
      description: "Project management dashboard built with Next.js",
      progress: 35,
    },
  });

  const ecommerce = await prisma.project.create({
    data: {
      name: "E-Commerce Store",
      description: "Modern online store built with Next.js",
      progress: 80,
    },
  });

  const portfolio = await prisma.project.create({
    data: {
      name: "Portfolio",
      description: "Personal developer portfolio website",
      progress: 100,
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Create dashboard layout",
        status: "DONE",
        priority: "HIGH",
        dueDate: new Date("2026-07-25"),
        projectId: devBoard.id,
      },
      {
        title: "Add sidebar navigation",
        status: "DONE",
        priority: "MEDIUM",
        dueDate: new Date("2026-07-26"),
        projectId: devBoard.id,
      },
      {
        title: "Create statistics cards",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-07-28"),
        projectId: devBoard.id,
      },
      {
        title: "Create projects section",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date("2026-07-30"),
        projectId: devBoard.id,
      },
      {
        title: "Improve responsive design",
        status: "TODO",
        priority: "LOW",
        dueDate: new Date("2026-08-02"),
        projectId: ecommerce.id,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        name: "Maksym",
        email: "maksym@example.com",
        role: "OWNER",
        isOnline: true,
      },
      {
        name: "Anna",
        email: "anna@example.com",
        role: "DESIGNER",
        isOnline: true,
      },
      {
        name: "Alex",
        email: "alex@example.com",
        role: "DEVELOPER",
        isOnline: false,
      },
      {
        name: "Kate",
        email: "kate@example.com",
        role: "DEVELOPER",
        isOnline: true,
      },
    ],
  });

  console.log("Database seeded successfully.");

  console.log({
    projects: [devBoard.name, ecommerce.name, portfolio.name],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
