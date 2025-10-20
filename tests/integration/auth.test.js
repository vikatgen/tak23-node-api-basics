import request from 'supertest';
import app from '../../server.js';
import { cleanDatabase, disconnectDatabase } from '../helpers/testDb.js';

describe('Authentication API', () => {
  beforeAll(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      const newUser = {
        email: 'john@example.com',
        password: 'password123',
      };

      const response = await request(app)
        .post('/register')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User created successfully');
    });

    it('should return 500 if email is missing', async () => {
      const invalidUser = {
        password: 'password123',
      };

      const response = await request(app)
        .post('/register')
        .send(invalidUser)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 if email already exists', async () => {
      const user = {
        email: 'duplicate@example.com',
        password: 'password123',
      };

      await request(app).post('/register').send(user).expect(201);

      const response = await request(app)
        .post('/register')
        .send(user)
        .expect(400);

      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /login', () => {
    it('should login with valid credentials', async () => {
      const user = {
        email: 'jane@example.com',
        password: 'password123',
      };
      await request(app).post('/register').send(user);

      const response = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: user.password,
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(0);
    });

    it('should return 401 with invalid password', async () => {
      const user = {
        email: 'jane@example.com',
        password: 'correctpassword',
      };
      await request(app).post('/register').send(user);

      const response = await request(app)
        .post('/login')
        .send({
          email: user.email,
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 for non-existent user', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});
