import { NextResponse } from "next/server";
import { getKanbanTasks } from "@/services/kanban";

export async function GET() {
  try {
    const tasks = await getKanbanTasks();
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json(
      {
        message: "Failed to fetch Kanban tasks",
      },
      {
        status: 500,
      },
    );
  }
}
