import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import bookDocs from "../docs/swagger/book.docs.js";
import authDocs from "../docs/swagger/auth.docs.js";
import authorDocs from "../docs/swagger/author.docs.js";
import publisherDocs from "../docs/swagger/publisher.docs.js";
import categoryDocs from "../docs/swagger/category.docs.js";
import schemas from "../docs/swagger/schema.js";
import environment from "./config.js";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TAK23 Book REST API',
            version: '1.0.0',
            description: 'NodeJS Express backend API for book management.'
        },
        servers: [
            {
                url: `http://localhost:${environment.PORT}`,
            },
        ],
        paths: {
            ...bookDocs,
            ...authDocs,
            ...authorDocs,
            ...publisherDocs,
            ...categoryDocs,
        },
        components: {
            schemas: schemas,
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [],
};

const specs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}