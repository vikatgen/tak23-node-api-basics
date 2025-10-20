import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../../config/PrismaClient.js';

export async function createAuthenticatedUser(userData = {}) {
  const defaultUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  const user = { ...defaultUser, ...userData };

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      email: user.email,
      passwordHash: hashedPassword,
    },
  });

  const JWT_SECRET = process.env.JWT_SECRET_HASH || 'test-secret-hash-for-testing-only';
  const token = jwt.sign(
    { id: createdUser.id, email: createdUser.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    user: createdUser,
    token,
    password: user.password,
  };
}

export function generateToken(userId, email) {
  const JWT_SECRET = process.env.JWT_SECRET_HASH || 'test-secret-hash-for-testing-only';
  return jwt.sign(
    { id: userId, email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function generateInvalidToken() {
  return 'invalid.jwt.token';
}
