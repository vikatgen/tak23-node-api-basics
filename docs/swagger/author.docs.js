export default {
    '/authors': {
        get: {
            tags: ['Authors'],
            summary: 'Get all authors',
            description: 'Retrieve a list of all authors with filtering, sorting, and pagination support. Requires authentication.',
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
                    name: 'search',
                    schema: {
                        type: 'string'
                    },
                    description: 'Search authors by first name or last name'
                },
                {
                    in: 'query',
                    name: 'sort',
                    schema: {
                        type: 'string',
                        enum: [
                            'first_name', '-first_name',
                            'last_name', '-last_name',
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
                    description: 'List of authors retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Author'
                                        }
                                    },
                                    meta: {
                                        type: 'object',
                                        properties: {
                                            page: {
                                                type: 'integer',
                                                description: 'Current page number'
                                            },
                                            limit: {
                                                type: 'integer',
                                                description: 'Number of items per page'
                                            },
                                            total: {
                                                type: 'integer',
                                                description: 'Total number of authors'
                                            },
                                            totalPages: {
                                                type: 'integer',
                                                description: 'Total number of pages'
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
            tags: ['Authors'],
            summary: 'Create a new author',
            description: 'Add a new author to the database. Requires authentication.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/AuthorInput'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Author created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Author created successfully.'
                                    },
                                    newAuthor: {
                                        $ref: '#/components/schemas/Author'
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
    '/authors/{id}': {
        get: {
            tags: ['Authors'],
            summary: 'Get an author by ID',
            description: 'Retrieve a specific author by their ID. Requires authentication.',
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
                    description: 'Author ID'
                }
            ],
            responses: {
                200: {
                    description: 'Author retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    author: {
                                        $ref: '#/components/schemas/Author'
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
                    description: 'Author not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Author not found.'
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
            tags: ['Authors'],
            summary: 'Update an author',
            description: 'Update an existing author by ID. Requires authentication.',
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
                    description: 'Author ID'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/AuthorInput'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Author updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Author updated successfully.'
                                    },
                                    updatedAuthor: {
                                        $ref: '#/components/schemas/Author'
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
                    description: 'Author not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Author not found.'
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
            tags: ['Authors'],
            summary: 'Delete an author',
            description: 'Delete a specific author by their ID. Requires authentication.',
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
                    description: 'Author ID'
                }
            ],
            responses: {
                200: {
                    description: 'Author deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Author deleted successfully.'
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
                    description: 'Author not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Author not found.'
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
