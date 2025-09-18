# Installation Guide

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **MySQL** database server

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
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
JWT_SECRET="your-jwt-secret-key"
```

Replace:
- `username` with your MySQL username
- `password` with your MySQL password
- `database_name` with your desired database name
- `your-jwt-secret-key` with a secure secret key for JWT tokens

### 4. Database Setup
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
- Ensure MySQL server is running
- Verify database credentials in `.env`
- Check if the database exists

### Port Already in Use
- Change the `PORT` variable in `.env` to an available port
- Or stop the process using port 3006

### Migration Errors
- Ensure database is accessible
- Run `npx prisma db push` for development
- Check Prisma schema syntax in `prisma/schema.prisma`