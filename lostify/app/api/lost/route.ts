import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const itemName = formData.get("itemName") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as File | null;

    // Convert image to Base64 (optional)
    let imageData = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      imageData = Buffer.from(bytes).toString("base64");
    }

    await pool.query(
      "INSERT INTO lost_items (item_name, description, location, contact, email, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [itemName, description, location, contact, email, imageData]
    );

    return NextResponse.json({ message: "Lost item saved successfully ✅" });
  } catch (err) {
    console.error("Error inserting data:", err);
    return NextResponse.json(
      { error: "Failed to save lost item" },
      { status: 500 }
    );
  }
}
