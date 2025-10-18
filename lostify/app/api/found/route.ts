import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const foundItems = await prisma.foundItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(foundItems);
  } catch (err) {
    console.error("Error fetching found items:", err);
    return NextResponse.json(
      { error: "Failed to fetch found items" },
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

    await prisma.foundItem.create({
      data: {
        itemName,
        description,
        location,
        contact,
        email,
        image: imageData,
      },
    });

    return NextResponse.json({ message: "Found item saved successfully" });
  } catch (err) {
    console.error("Error inserting found item:", err);
    return NextResponse.json(
      { error: "Failed to save found item" },
      { status: 500 }
    );
  }
}
