import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch both lost and found items
    const lostItems = await prisma.lostItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const foundItems = await prisma.foundItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Combine and add type indicator
    const allItems = [
      ...lostItems.map((item) => ({ ...item, type: "lost" as const })),
      ...foundItems.map((item) => ({ ...item, type: "found" as const })),
    ];

    // Sort by createdAt descending
    allItems.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allItems);
  } catch (err) {
    console.error("Error fetching recent items:", err);
    return NextResponse.json(
      { error: "Failed to fetch recent items" },
      { status: 500 }
    );
  }
}
