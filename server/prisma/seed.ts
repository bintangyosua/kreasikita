import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type category = {
  id: number;
  name: string;
};

const categories: category[] = [
  {
    id: 1,
    name: 'Youtuber',
  },
  {
    id: 2,
    name: 'Vtuber',
  },
  {
    id: 3,
    name: 'Design',
  },
  {
    id: 4,
    name: 'Fashion',
  },
  {
    id: 5,
    name: 'Film',
  },
  {
    id: 6,
    name: 'Music',
  },
  {
    id: 7,
    name: 'Food',
  },
  {
    id: 8,
    name: 'Game',
  },
  {
    id: 9,
    name: 'Anime',
  },
  {
    id: 10,
    name: 'Photography',
  },
  {
    id: 11,
    name: 'Technology',
  },
];

async function main() {
  categories.forEach(async (value) => {
    await prisma.category.upsert({
      where: { id: value.id },
      update: {},
      create: {
        name: value.name,
      },
    });
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

  const luthfi = await prisma.user.upsert({
    where: { email: 'luthfi@gg.com' },
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
