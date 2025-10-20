import prisma from '../../config/PrismaClient.js';

export async function cleanDatabase() {
  await prisma.bookCategory.deleteMany({});
  await prisma.bookAuthors.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.publisher.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

export async function seedTestData() {
  await cleanDatabase();

  const publisher = await prisma.publisher.create({
    data: {
      name: 'Test Publisher',
    },
  });

  const author1 = await prisma.author.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      first_name: 'Jane',
      last_name: 'Smith',
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: 'Fiction',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Science',
    },
  });

  return {
    publisher,
    authors: [author1, author2],
    categories: [category1, category2]
  };
}
