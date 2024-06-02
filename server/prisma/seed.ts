import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // id: 1,
      name: 'Youtuber',
    },
  });

  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      // id: 2,
      name: 'Vtuber',
    },
  });

  const bintang = await prisma.user.upsert({
    where: { email: 'bintang@gg.com' },
    update: {},
    create: {
      email: 'bintang@gg.com',
      username: 'bintang',
      name: 'Bintang',
      password: '123',
      categoryId: 1,
    },
  });
  const zia = await prisma.user.upsert({
    where: { email: 'zia@gg.com' },
    update: {},
    create: {
      email: 'zia@gg.com',
      username: 'zia',
      name: 'Zia',
      password: '123',
      categoryId: 1,
    },
  });
  const luthgi = await prisma.user.upsert({
    where: { email: 'luthgi@gg.com' },
    update: {},
    create: {
      email: 'luthfi@gg.com',
      username: 'luthfi',
      name: 'luthfi',
      password: '123',
      categoryId: 2,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
