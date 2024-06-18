import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type category = {
  id: number;
  name: string;
};

type TBank = {
  bank_code: string;
  bank_name: string;
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

const banks: TBank[] = [
  {
    bank_code: 'bca',
    bank_name: 'BCA',
  },
  {
    bank_code: 'bri',
    bank_name: 'BRI',
  },
  {
    bank_code: 'bni',
    bank_name: 'BNI',
  },
  {
    bank_code: 'mandiri',
    bank_name: 'Mandiri',
  },
];

async function main() {
  categories.forEach(async (value) => {
    await prisma.category.upsert({
      where: { id: value.id },
      update: {},
      create: {
        id: value.id,
        name: value.name,
      },
    });
  });

  banks.forEach(async (value) => {
    await prisma.bank.upsert({
      where: { bank_code: value.bank_code },
      update: {},
      create: {
        bank_name: value.bank_name,
        bank_code: value.bank_code,
      },
    });
  });

  const anonymous = await prisma.user.upsert({
    where: { email: 'anonymous@gg.com' },
    update: {
      password: '123456',
    },
    create: {
      email: 'anonymous@gg.com',
      username: 'anonymous',
      name: 'Anonymous',
      password: '123456',
      categoryId: 1,
      hidden: true,
    },
  });

  const bintang = await prisma.user.upsert({
    where: { email: 'bintang@gg.com' },
    update: {
      password: '123456',
    },
    create: {
      email: 'bintang@gg.com',
      username: 'bintang',
      name: 'Bintang',
      password: '123456',
      categoryId: 1,
    },
  });

  const zia = await prisma.user.upsert({
    where: { email: 'zia@gg.com' },
    update: {
      password: '123456',
    },
    create: {
      email: 'zia@gg.com',
      username: 'zia',
      name: 'Zia',
      password: '123456',
      categoryId: 1,
    },
  });

  const luthfi = await prisma.user.upsert({
    where: { email: 'luthfi@gg.com' },
    update: {
      password: '123456',
    },
    create: {
      email: 'luthfi@gg.com',
      username: 'luthfi',
      name: 'luthfi',
      password: '123456',
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
