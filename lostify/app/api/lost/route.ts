import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lostItems = await prisma.lostItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(lostItems);
  } catch (err) {
    console.error("Error fetching lost items:", err);
    return NextResponse.json(
      { error: "Failed to fetch lost items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const itemName = formData.get("itemName") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as File | null;

    let imageData = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      imageData = Buffer.from(bytes).toString("base64");
    }

    await prisma.lostItem.create({
      data: {
        itemName,
        description,
        location,
        contact,
        email,
        image: imageData,
      },
    });

    return NextResponse.json({ message: "Lost item saved successfully" });
  } catch (err) {
    console.error("Error inserting lost item:", err);
    return NextResponse.json(
      { error: "Failed to save lost item" },
      { status: 500 }
    );
  }
}
