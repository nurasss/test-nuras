import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const workTypes = [
  'Кладка перегородок',
  'Монтаж опалубки',
  'Бетонирование',
  'Армирование',
  'Штукатурные работы',
  'Монтаж инженерных сетей',
];

async function main() {
  for (const name of workTypes) {
    await prisma.workType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
