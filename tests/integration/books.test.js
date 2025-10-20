import request from 'supertest';
import app from '../../server.js';
import { cleanDatabase, disconnectDatabase ,seedTestData } from "../helpers/testDb.js";
import { createAuthenticatedUser } from "../helpers/auth.js";

describe("Books API", () => {
    let authToken;
    let testingData;


    beforeAll(async () => {
        await cleanDatabase();
    });

    afterAll(async () => {
        await disconnectDatabase();
    });

    beforeEach(async () => {
        await cleanDatabase();
        testingData = await seedTestData();
        const { token } = await createAuthenticatedUser();
        authToken = token;
    });

    describe("GET /books", () => {

        it("should return all books with pagination", async () => {
            
            await request(app)
                .post("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .send({
                    title: "Test Book",
                    description: "A test book description",
                    year: 2024,
                    authorIds: [testingData.authors[0].id, testingData.authors[1].id],
                    categoryIds: [testingData.categories[0].id, testingData.categories[1].id],
                    publisherId: testingData.publisher.id,
                });

            const response = await request(app)
                .get("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200);

            expect(response.body).toHaveProperty("data");
            expect(response.body).toHaveProperty("meta");
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.meta).toHaveProperty("total");
            expect(response.body.meta).toHaveProperty("totalPages");
            expect(response.body.meta).toHaveProperty("limit");
            expect(response.body.meta.total).toBeGreaterThan(0);
        })

        it("should return single book by id", async () => {

            const savedBook = await request(app)
                .post("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .send({
                    title: "Test Book",
                    description: "A test book description",
                    year: 2024,
                    authorIds: [testingData.authors[0].id, testingData.authors[1].id],
                    categoryIds: [testingData.categories[0].id, testingData.categories[1].id],
                    publisherId: testingData.publisher.id,
                })

            const bookId = savedBook.body.newBook.id;

            const response = await request(app)
                .get(`/books/${bookId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(200);

            expect(response.body).toHaveProperty("book");
            expect(response.body.book).toHaveProperty("id");
            expect(response.body.book.id).toBe(bookId);
        })
    })

    describe("POST /books", () => {

        it("should create a new book", async () => {
            const response = await request(app)
            .post("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .send({
                    title: "Test Book",
                    description: "A test book description",
                    year: 2024,
                    authorIds: [testingData.authors[0].id, testingData.authors[1].id],
                    categoryIds: [testingData.categories[0].id, testingData.categories[1].id],
                    publisherId: testingData.publisher.id,
                })
                .expect("Content-Type", "application/json; charset=utf-8")
                .expect(201);

            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("newBook");
            expect(response.body.newBook).toHaveProperty("id");
            expect(response.body.newBook).toHaveProperty("title");
            expect(response.body.newBook.title).toBe("Test Book");
            expect(response.body.newBook).toHaveProperty("authors");
            expect(response.body.newBook).toHaveProperty("publisher");
            expect(response.body.newBook).toHaveProperty("categories");
        })

        it("should return bad request if title is missing", async () => {
            const response = await request(app)
                .post("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .send({
                    description: "A test book description",
                    year: 2024,
                    authorIds: [testingData.authors[0].id, testingData.authors[1].id],
                    categoryIds: [testingData.categories[0].id, testingData.categories[1].id],
                    publisherId: testingData.publisher.id,
                })
                .expect(400);

            console.log(response.body);

            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("ValidationError");
            expect(response.body).toHaveProperty("errors");
            expect(response.body.errors).toHaveProperty("title");
            expect(response.body.errors.title).toBe("Title is required")
        })

        it("should return error bag if required fields are missing", async () => {
            const response = await request(app)
                .post("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("ValidationError");
            expect(response.body).toHaveProperty("errors");
            expect(response.body.errors).toHaveProperty("title");
            expect(response.body.errors.title).toBe("Title is required");
            expect(response.body.errors).toHaveProperty("description");
            expect(response.body.errors.description).toBe("Description is required");
            expect(response.body.errors).toHaveProperty("year");
            expect(response.body.errors.year).toBe("Year is required");
            expect(response.body.errors).toHaveProperty("authorIds");
            expect(response.body.errors.authorIds).toBe("Author IDs are required");
            expect(response.body.errors).toHaveProperty("categoryIds");
            expect(response.body.errors.categoryIds).toBe("Category IDs are required");
            expect(response.body.errors).toHaveProperty("publisherId");
            expect(response.body.errors.publisherId).toBe("Publisher ID is required");
        })

        it("should return validation error if year is not in correct format", async () => {
            const invalidBook = {
                title: "Test Book",
                description: "A test book description",
                year: 20,
                authorIds: [testingData.authors[0].id, testingData.authors[1].id],
                categoryIds: [testingData.categories[0].id, testingData.categories[1].id],
                publisherId: testingData.publisher.id,
            };

            const response = await request(app)
                .post("/books")
                .set("Authorization", `Bearer ${authToken}`)
                .send(invalidBook)
                .expect(400);

            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("ValidationError");
            expect(response.body).toHaveProperty("errors");
            expect(response.body.errors).toHaveProperty("year");
        })
    })
});