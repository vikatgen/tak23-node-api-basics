# Installation Guide

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tak23-node-api-basics
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory by copying the example:
```bash
cp .env.example .env
```

Edit the `.env` file and configure the following variables:
```env
PORT=3006
DATABASE_URL="file:./dev.sqlite"
JWT_SECRET="your-jwt-secret-key"
```

Replace:
- `your-jwt-secret-key` with a secure secret key for JWT tokens

The SQLite database file (`dev.sqlite`) will be automatically created in the project root when you run the migrations.

### 4. Database Setup
Create a SQLite file into prisma folder
```bash
touch ./prisma/dev.sqlite
```

Generate and run Prisma migrations:
```bash
npx prisma migrate dev
```

Generate Prisma client:
```bash
npx prisma generate
```

### 5. Start the Server
```bash
npm run server
```

The API server will start on `http://localhost:3006`

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
```
http://localhost:3006/api-docs
```

## Project Structure

```
├── controllers/        # Request handlers
├── middlewares/       # Express middleware
├── prisma/           # Database schema and migrations
├── routes/           # API route definitions
├── utils/            # Utility functions
├── validations/      # Input validation schemas
├── server.js         # Main application entry point
└── package.json      # Project dependencies
```

## Database Models

The application includes the following models:
- **User**: Authentication and user management
- **Book**: Book information with title, description, year, author, publisher
- **Category**: Book categories
- **BookCategory**: Many-to-many relationship between books and categories

## Troubleshooting

### Database Connection Issues
- Verify the SQLite database file path in `.env`
- Ensure the project directory is writable (for SQLite file creation)
- Check if migrations have been run successfully

### Port Already in Use
- Change the `PORT` variable in `.env` to an available port
- Or stop the process using port 3006

### Migration Errors
- Ensure the project directory is writable for SQLite file creation
- Run `npx prisma db push` for development
- Check Prisma schema syntax in `prisma/schema.prisma`
- Delete the SQLite file and re-run migrations if schema changes cause conflicts