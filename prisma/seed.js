import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Fiction' },
  { name: 'Non-Fiction' },
  { name: 'Science Fiction' },
  { name: 'Fantasy' },
  { name: 'Mystery' },
  { name: 'Romance' },
  { name: 'Thriller' },
  { name: 'Biography' },
  { name: 'History' },
  { name: 'Technology' }
];

const books = [
  {
    title: 'The Great Gatsby',
    description: 'A classic American novel about the Jazz Age',
    year: 1925,
    author: 'F. Scott Fitzgerald',
    publisher: 'Charles Scribner\'s Sons',
    categories: ['Fiction']
  },
  {
    title: 'To Kill a Mockingbird',
    description: 'A novel about racial injustice in the American South',
    year: 1960,
    author: 'Harper Lee',
    publisher: 'J. B. Lippincott & Co.',
    categories: ['Fiction']
  },
  {
    title: 'Dune',
    description: 'Epic science fiction novel set in the distant future',
    year: 1965,
    author: 'Frank Herbert',
    publisher: 'Chilton Books',
    categories: ['Science Fiction', 'Fantasy']
  },
  {
    title: 'The Hobbit',
    description: 'A fantasy adventure about a hobbit\'s unexpected journey',
    year: 1937,
    author: 'J.R.R. Tolkien',
    publisher: 'George Allen & Unwin',
    categories: ['Fantasy', 'Fiction']
  },
  {
    title: 'Agatha Christie: An Autobiography',
    description: 'The life story of the famous mystery writer',
    year: 1977,
    author: 'Agatha Christie',
    publisher: 'Collins',
    categories: ['Biography', 'Non-Fiction']
  },
  {
    title: 'The Murder of Roger Ackroyd',
    description: 'Classic mystery novel with an unexpected twist',
    year: 1926,
    author: 'Agatha Christie',
    publisher: 'William Collins, Sons',
    categories: ['Mystery', 'Fiction']
  },
  {
    title: 'Sapiens',
    description: 'A brief history of humankind',
    year: 2011,
    author: 'Yuval Noah Harari',
    publisher: 'Dvir Publishing House',
    categories: ['History', 'Non-Fiction']
  },
  {
    title: 'The Pragmatic Programmer',
    description: 'Your journey to mastery in software development',
    year: 1999,
    author: 'Andrew Hunt and David Thomas',
    publisher: 'Addison-Wesley',
    categories: ['Technology', 'Non-Fiction']
  },
  {
    title: 'Gone Girl',
    description: 'Psychological thriller about a marriage gone wrong',
    year: 2012,
    author: 'Gillian Flynn',
    publisher: 'Crown Publishing Group',
    categories: ['Thriller', 'Mystery']
  },
  {
    title: 'Pride and Prejudice',
    description: 'Classic romance novel about love and social class',
    year: 1813,
    author: 'Jane Austen',
    publisher: 'T. Egerton',
    categories: ['Romance', 'Fiction']
  },
  {
    title: 'The Martian',
    description: 'Science fiction about an astronaut stranded on Mars',
    year: 2011,
    author: 'Andy Weir',
    publisher: 'Crown Publishing Group',
    categories: ['Science Fiction']
  },
  {
    title: 'Clean Code',
    description: 'A handbook of agile software craftsmanship',
    year: 2008,
    author: 'Robert C. Martin',
    publisher: 'Prentice Hall',
    categories: ['Technology', 'Non-Fiction']
  },
  {
    title: 'The Da Vinci Code',
    description: 'Mystery thriller involving art, history, and religion',
    year: 2003,
    author: 'Dan Brown',
    publisher: 'Doubleday',
    categories: ['Thriller', 'Mystery']
  },
  {
    title: 'Steve Jobs',
    description: 'Biography of the Apple co-founder',
    year: 2011,
    author: 'Walter Isaacson',
    publisher: 'Simon & Schuster',
    categories: ['Biography', 'Non-Fiction']
  },
  {
    title: 'The Handmaid\'s Tale',
    description: 'Dystopian novel about a totalitarian society',
    year: 1985,
    author: 'Margaret Atwood',
    publisher: 'McClelland & Stewart',
    categories: ['Science Fiction', 'Fiction']
  }
];

async function main() {
  console.log('Starting database seeding...');

  console.log('Clearing existing data...');
  await prisma.bookCategory.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creating categories...');
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category
      })
    )
  );
  console.log(`Created ${createdCategories.length} categories`);

  console.log('Creating books...');
  for (const bookData of books) {
    const { categories: bookCategories, ...bookFields } = bookData;

    const categoryRecords = await prisma.category.findMany({
      where: {
        name: {
          in: bookCategories
        }
      }
    });

    const book = await prisma.book.create({
      data: {
        ...bookFields,
        categories: {
          create: categoryRecords.map(category => ({
            category: {
              connect: { id: category.id }
            }
          }))
        }
      }
    });

    console.log(`Created book: ${book.title}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });