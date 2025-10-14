export default {
    '/publishers': {
        get: {
            tags: ['Publishers'],
            summary: 'Get all publishers',
            description: 'Retrieve a list of all publishers with filtering, sorting, and pagination support. Requires authentication.',
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
                    description: 'Search publishers by name'
                },
                {
                    in: 'query',
                    name: 'sort',
                    schema: {
                        type: 'string',
                        enum: [
                            'name', '-name',
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
                    description: 'List of publishers retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Publisher'
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
                                                description: 'Total number of publishers'
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
            tags: ['Publishers'],
            summary: 'Create a new publisher',
            description: 'Add a new publisher to the database. Requires authentication.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/PublisherInput'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Publisher created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Publisher created successfully.'
                                    },
                                    newPublisher: {
                                        $ref: '#/components/schemas/Publisher'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data or publisher name already exists'
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
    '/publishers/{id}': {
        get: {
            tags: ['Publishers'],
            summary: 'Get a publisher by ID',
            description: 'Retrieve a specific publisher by their ID. Requires authentication.',
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
                    description: 'Publisher ID'
                }
            ],
            responses: {
                200: {
                    description: 'Publisher retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    publisher: {
                                        $ref: '#/components/schemas/Publisher'
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
                    description: 'Publisher not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Publisher not found.'
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
            tags: ['Publishers'],
            summary: 'Update a publisher',
            description: 'Update an existing publisher by ID. Requires authentication.',
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
                    description: 'Publisher ID'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/PublisherInput'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Publisher updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Publisher updated successfully.'
                                    },
                                    updatedPublisher: {
                                        $ref: '#/components/schemas/Publisher'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data or publisher name already exists'
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                404: {
                    description: 'Publisher not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Publisher not found.'
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
            tags: ['Publishers'],
            summary: 'Delete a publisher',
            description: 'Delete a specific publisher by their ID. Requires authentication.',
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
                    description: 'Publisher ID'
                }
            ],
            responses: {
                200: {
                    description: 'Publisher deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Publisher deleted successfully.'
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
                    description: 'Publisher not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Publisher not found.'
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
