import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@admin.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("adminadmin", 10);

  await prisma.user.create({
    data: {
      email,
      name: "admin",
      avatar:
        "v1669912525/d6405738890860b9844024299ee0c7a6--flat-icons-free-icon_scra31.jpg",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  // await prisma.note.create({
  //   data: {
  //     title: "My first note",
  //     body: "Hello, world!",
  //     userId: user.id,
  //   },
  // });

  // await prisma.note.create({
  //   data: {
  //     title: "My second note",
  //     body: "Hello, world!",
  //     userId: user.id,
  //   },
  // });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
