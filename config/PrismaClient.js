import { PrismaClient } from '@prisma/client';
import './config.js';

let prisma = new PrismaClient();

export default prisma;