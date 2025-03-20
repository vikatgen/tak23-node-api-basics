export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Book API',
        description: 'API for managing books',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    paths: {
        '/books': {
            get: {
                summary: 'Get all books',
                description: 'Retrieve a list of all books',
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Book'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                summary: 'Create a new book',
                description: 'Add a new book to the database',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/BookInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Book created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Book'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid input'
                    }
                }
            }
        },
        '/books/{id}': {
            get: {
                summary: 'Get a book by ID',
                description: 'Retrieve a specific book by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the book to retrieve',
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Book'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Book not found'
                    }
                }
            },
            put: {
                summary: 'Update a book',
                description: 'Update an existing book by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the book to update',
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/BookInput'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Book updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Book'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid input'
                    },
                    '404': {
                        description: 'Book not found'
                    }
                }
            },
            delete: {
                summary: 'Delete a book',
                description: 'Delete a book by its ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID of the book to delete',
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Book deleted successfully'
                    },
                    '404': {
                        description: 'Book not found'
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            BookInput: {
                type: 'object',
                required: ['title', 'description', 'year', 'author', 'publisher'],
                properties: {
                    title: {
                        type: 'string',
                        description: 'The title of the book'
                    },
                    description: {
                        type: 'string',
                        description: 'A description of the book'
                    },
                    year: {
                        type: 'integer',
                        description: 'The publication year'
                    },
                    author: {
                        type: 'string',
                        description: 'The author of the book'
                    },
                    publisher: {
                        type: 'string',
                        description: 'The publisher of the book'
                    }
                }
            },
            Book: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The unique identifier for the book'
                    },
                    title: {
                        type: 'string',
                        description: 'The title of the book'
                    },
                    description: {
                        type: 'string',
                        description: 'A description of the book'
                    },
                    year: {
                        type: 'integer',
                        description: 'The publication year'
                    },
                    author: {
                        type: 'string',
                        description: 'The author of the book'
                    },
                    publisher: {
                        type: 'string',
                        description: 'The publisher of the book'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'The date and time when the book was created'
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'The date and time when the book was last updated'
                    }
                }
            }
        }
    }
}; 