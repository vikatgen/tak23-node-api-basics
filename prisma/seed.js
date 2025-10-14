import bcrypt from 'bcrypt';
import prisma from "../config/PrismaClient.js";

const defaultUser = {
  email: 'gen.vikat@ametikool.ee',
  password: 'gen.vikat@ametikool.ee'
};

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

const publishers = [
  { name: 'Charles Scribner\'s Sons' },
  { name: 'J. B. Lippincott & Co.' },
  { name: 'Chilton Books' },
  { name: 'George Allen & Unwin' },
  { name: 'Collins' },
  { name: 'William Collins, Sons' },
  { name: 'Dvir Publishing House' },
  { name: 'Addison-Wesley' },
  { name: 'Crown Publishing Group' },
  { name: 'T. Egerton' },
  { name: 'Prentice Hall' },
  { name: 'Doubleday' },
  { name: 'Simon & Schuster' },
  { name: 'McClelland & Stewart' }
];

const authors = [
  { first_name: 'F. Scott', last_name: 'Fitzgerald' },
  { first_name: 'Harper', last_name: 'Lee' },
  { first_name: 'Frank', last_name: 'Herbert' },
  { first_name: 'J.R.R.', last_name: 'Tolkien' },
  { first_name: 'Agatha', last_name: 'Christie' },
  { first_name: 'Yuval Noah', last_name: 'Harari' },
  { first_name: 'Andrew', last_name: 'Hunt' },
  { first_name: 'David', last_name: 'Thomas' },
  { first_name: 'Gillian', last_name: 'Flynn' },
  { first_name: 'Jane', last_name: 'Austen' },
  { first_name: 'Andy', last_name: 'Weir' },
  { first_name: 'Robert C.', last_name: 'Martin' },
  { first_name: 'Dan', last_name: 'Brown' },
  { first_name: 'Walter', last_name: 'Isaacson' },
  { first_name: 'Margaret', last_name: 'Atwood' }
];

const books = [
  {
    title: 'The Great Gatsby',
    description: 'A classic American novel about the Jazz Age',
    year: 1925,
    authors: ['F. Scott Fitzgerald'],
    publisher: 'Charles Scribner\'s Sons',
    categories: ['Fiction']
  },
  {
    title: 'To Kill a Mockingbird',
    description: 'A novel about racial injustice in the American South',
    year: 1960,
    authors: ['Harper Lee'],
    publisher: 'J. B. Lippincott & Co.',
    categories: ['Fiction']
  },
  {
    title: 'Dune',
    description: 'Epic science fiction novel set in the distant future',
    year: 1965,
    authors: ['Frank Herbert'],
    publisher: 'Chilton Books',
    categories: ['Science Fiction', 'Fantasy']
  },
  {
    title: 'The Hobbit',
    description: 'A fantasy adventure about a hobbit\'s unexpected journey',
    year: 1937,
    authors: ['J.R.R. Tolkien'],
    publisher: 'George Allen & Unwin',
    categories: ['Fantasy', 'Fiction']
  },
  {
    title: 'Agatha Christie: An Autobiography',
    description: 'The life story of the famous mystery writer',
    year: 1977,
    authors: ['Agatha Christie'],
    publisher: 'Collins',
    categories: ['Biography', 'Non-Fiction']
  },
  {
    title: 'The Murder of Roger Ackroyd',
    description: 'Classic mystery novel with an unexpected twist',
    year: 1926,
    authors: ['Agatha Christie'],
    publisher: 'William Collins, Sons',
    categories: ['Mystery', 'Fiction']
  },
  {
    title: 'Sapiens',
    description: 'A brief history of humankind',
    year: 2011,
    authors: ['Yuval Noah Harari'],
    publisher: 'Dvir Publishing House',
    categories: ['History', 'Non-Fiction']
  },
  {
    title: 'The Pragmatic Programmer',
    description: 'Your journey to mastery in software development',
    year: 1999,
    authors: ['Andrew Hunt', 'David Thomas'],
    publisher: 'Addison-Wesley',
    categories: ['Technology', 'Non-Fiction']
  },
  {
    title: 'Gone Girl',
    description: 'Psychological thriller about a marriage gone wrong',
    year: 2012,
    authors: ['Gillian Flynn'],
    publisher: 'Crown Publishing Group',
    categories: ['Thriller', 'Mystery']
  },
  {
    title: 'Pride and Prejudice',
    description: 'Classic romance novel about love and social class',
    year: 1813,
    authors: ['Jane Austen'],
    publisher: 'T. Egerton',
    categories: ['Romance', 'Fiction']
  },
  {
    title: 'The Martian',
    description: 'Science fiction about an astronaut stranded on Mars',
    year: 2011,
    authors: ['Andy Weir'],
    publisher: 'Crown Publishing Group',
    categories: ['Science Fiction']
  },
  {
    title: 'Clean Code',
    description: 'A handbook of agile software craftsmanship',
    year: 2008,
    authors: ['Robert C. Martin'],
    publisher: 'Prentice Hall',
    categories: ['Technology', 'Non-Fiction']
  },
  {
    title: 'The Da Vinci Code',
    description: 'Mystery thriller involving art, history, and religion',
    year: 2003,
    authors: ['Dan Brown'],
    publisher: 'Doubleday',
    categories: ['Thriller', 'Mystery']
  },
  {
    title: 'Steve Jobs',
    description: 'Biography of the Apple co-founder',
    year: 2011,
    authors: ['Walter Isaacson'],
    publisher: 'Simon & Schuster',
    categories: ['Biography', 'Non-Fiction']
  },
  {
    title: 'The Handmaid\'s Tale',
    description: 'Dystopian novel about a totalitarian society',
    year: 1985,
    authors: ['Margaret Atwood'],
    publisher: 'McClelland & Stewart',
    categories: ['Science Fiction', 'Fiction']
  }
];

function findAuthorByFullName(authorName, authorRecords) {
  return authorRecords.find(author => {
    const fullName = `${author.first_name} ${author.last_name}`;
    return fullName === authorName;
  });
}

async function main() {
  console.log('Starting database seeding...');

  console.log('Clearing existing data...');
  await prisma.bookAuthors.deleteMany();
  await prisma.bookCategory.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating default user...');
  const passwordHash = await bcrypt.hash(defaultUser.password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email: defaultUser.email,
      passwordHash: passwordHash
    }
  });
  console.log(`Created user: ${createdUser.email}`);

  console.log('Creating categories...');
  const createdCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({
        data: category
      })
    )
  );
  console.log(`Created ${createdCategories.length} categories`);

  console.log('Creating publishers...');
  const createdPublishers = await Promise.all(
    publishers.map(publisher =>
      prisma.publisher.create({
        data: publisher
      })
    )
  );
  console.log(`Created ${createdPublishers.length} publishers`);

  console.log('Creating authors...');
  const createdAuthors = await Promise.all(
    authors.map(author =>
      prisma.author.create({
        data: author
      })
    )
  );
  console.log(`Created ${createdAuthors.length} authors`);

  console.log('Creating books with relationships...');
  for (const bookData of books) {
    const { categories: bookCategories, authors: bookAuthors, publisher: publisherName, ...bookFields } = bookData;

    const publisherRecord = createdPublishers.find(p => p.name === publisherName);
    if (!publisherRecord) {
      console.error(`Publisher not found: ${publisherName}`);
      continue;
    }

    const categoryRecords = createdCategories.filter(category => 
      bookCategories.includes(category.name)
    );

    const authorRecords = bookAuthors.map(authorName => {
      const authorRecord = findAuthorByFullName(authorName, createdAuthors);
      if (!authorRecord) {
        console.error(`Author not found: ${authorName}`);
        return null;
      }
      return authorRecord;
    }).filter(Boolean);

    if (authorRecords.length === 0) {
      console.error(`No valid authors found for book: ${bookFields.title}`);
      continue;
    }

    const book = await prisma.book.create({
      data: {
        ...bookFields,
        publisherId: publisherRecord.id,
        categories: {
          create: categoryRecords.map(category => ({
            category: {
              connect: { id: category.id }
            }
          }))
        },
        authors: {
          create: authorRecords.map(author => ({
            author: {
              connect: { id: author.id }
            }
          }))
        }
      }
    });

    console.log(`Created book: ${book.title} with ${authorRecords.length} authors and ${categoryRecords.length} categories`);
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