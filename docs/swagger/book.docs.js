export default {
    '/books': {
        get: {
            tags: ['Books'],
            summary: 'Get all books',
            description: 'Retrieve a list of all books with filtering, sorting, and pagination support. Requires authentication.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    schema: {
                        type: 'integer',
                        minimum: 1
                    },
                    description: 'Page number for pagination'
                },
                {
                    in: 'query',
                    name: 'limit',
                    schema: {
                        type: 'integer',
                        minimum: 1
                    },
                    description: 'Number of items per page'
                },
                {
                    in: 'query',
                    name: 'sort',
                    schema: {
                        type: 'string',
                        enum: [
                            'title', '-title',
                            'author', '-author',
                            'publisher', '-publisher',
                            'year', '-year',
                            'created_at', '-created_at',
                            'updated_at', '-updated_at'
                        ]
                    },
                    description: 'Sort field with direction. Fields without prefix are ascending, with minus (-) prefix are descending',
                    default: '-created_at'
                }
            ],
            responses: {
                200: {
                    description: 'List of books retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Book'
                                        }
                                    },
                                    meta: {
                                        type: 'object',
                                        properties: {
                                            total: {
                                                type: 'integer',
                                                description: 'Total number of books'
                                            },
                                            totalPages: {
                                                type: 'integer',
                                                description: 'Total number of pages'
                                            },
                                            limit: {
                                                type: 'integer',
                                                description: 'Number of items per page'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                500: {
                    description: 'Server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Something happening. Bad luck.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Books'],
            summary: 'Create a new book',
            description: 'Add a new book to the database. Requires authentication.',
            security: [{ bearerAuth: [] }],
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
                201: {
                    description: 'Book created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Book created successfully.'
                                    },
                                    newBook: {
                                        $ref: '#/components/schemas/Book'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data'
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                500: {
                    description: 'Server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Something happening. Bad luck.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/books/{id}': {
        get: {
            tags: ['Books'],
            summary: 'Get a book by ID',
            description: 'Retrieve a specific book by its ID. Requires authentication.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    },
                    description: 'Book ID'
                }
            ],
            responses: {
                200: {
                    description: 'Book retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    book: {
                                        $ref: '#/components/schemas/Book'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                404: {
                    description: 'Book not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Book not found.'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Something happening. Bad luck.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: ['Books'],
            summary: 'Update a book',
            description: 'Update an existing book by ID. Requires authentication.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    },
                    description: 'Book ID'
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
                200: {
                    description: 'Book updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Book updated successfully.'
                                    },
                                    updatedBook: {
                                        $ref: '#/components/schemas/Book'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data'
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                404: {
                    description: 'Book not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Book not found.'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Something happening. Bad luck.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        delete: {
            tags: ['Books'],
            summary: 'Delete a book',
            description: 'Delete a specific book by its ID. Requires authentication.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    },
                    description: 'Book ID'
                }
            ],
            responses: {
                200: {
                    description: 'Book deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Book deleted successfully.'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                404: {
                    description: 'Book not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Book not found.'
                                    }
                                }
                            }
                        }
                    }
                },
                500: {
                    description: 'Server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Something happening. Bad luck.'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};