import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Seed Found Items
  await prisma.foundItem.createMany({
    data: [
      {
        itemName: "Black Wallet",
        description: "Leather wallet with some cash and ID inside.",
        location: "Central Park Bench",
        contact: "123-456-7890",
        email: "finder@example.com",
        image: null,
      },
      {
        itemName: "iPhone 14",
        description: "White iPhone with cracked screen protector.",
        location: "Starbucks on 5th Avenue",
        contact: "987-654-3210",
        email: "person@example.com",
        image: null,
      },
    ],
  });

  // Seed Lost Items
  await prisma.lostItem.createMany({
    data: [
      {
        itemName: "Set of Car Keys",
        description: "Honda car keys with a red keychain.",
        location: "Near the library entrance",
        contact: "555-222-1111",
        email: "owner@example.com",
        image: null,
      },
      {
        itemName: "Backpack",
        description: "Blue backpack containing laptop and notebooks.",
        location: "Campus Cafeteria",
        contact: "333-444-5555",
        email: "student@example.com",
        image: null,
      },
    ],
  });

  console.log("✅ Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
