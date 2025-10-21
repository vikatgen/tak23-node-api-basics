import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../../config/PrismaClient.js';
import config from '../../config/config.js';

export async function createAuthenticatedUser(userData = {}) {

  const defaultUser = {
    name: 'Gen Vikat',
    email: 'gen.vikat@ametikool.ee',
    password: 'gen.vikat@ametikool.ee',
  };

  const user = { ...defaultUser, ...userData };

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      email: user.email,
      passwordHash: hashedPassword,
    },
  });

  const token = await generateToken(createdUser?.id, createdUser?.email);

  return {
    user: createdUser,
    token,
    password: user.password,
  };
}

export function generateToken(userId, email) {
  const JWT_SECRET = config.JWT_SECRET_HASH;
  return jwt.sign(
    { id: userId, email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function generateInvalidToken() {
  return 'invalid.jwt.token';
}
