export default {
    '/categories': {
        get: {
            tags: ['Categories'],
            summary: 'Get all categories',
            description: 'Retrieve a list of all categories with filtering, sorting, and pagination support. Requires authentication.',
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
                    description: 'Search categories by name'
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
                    description: 'List of categories retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Category'
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
                                                description: 'Total number of categories'
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
            tags: ['Categories'],
            summary: 'Create a new category',
            description: 'Add a new category to the database. Requires authentication.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CategoryInput'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Category created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Category created successfully.'
                                    },
                                    newCategory: {
                                        $ref: '#/components/schemas/Category'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data or category name already exists'
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
    '/categories/{id}': {
        get: {
            tags: ['Categories'],
            summary: 'Get a category by ID',
            description: 'Retrieve a specific category by its ID. Requires authentication.',
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
                    description: 'Category ID'
                }
            ],
            responses: {
                200: {
                    description: 'Category retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    category: {
                                        $ref: '#/components/schemas/Category'
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
                    description: 'Category not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Category not found.'
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
            tags: ['Categories'],
            summary: 'Update a category',
            description: 'Update an existing category by ID. Requires authentication.',
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
                    description: 'Category ID'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CategoryInput'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Category updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Category updated successfully.'
                                    },
                                    updatedCategory: {
                                        $ref: '#/components/schemas/Category'
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data or category name already exists'
                },
                401: {
                    description: 'Unauthorized - Missing or invalid authentication token'
                },
                404: {
                    description: 'Category not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Category not found.'
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
            tags: ['Categories'],
            summary: 'Delete a category',
            description: 'Delete a specific category by its ID. Requires authentication.',
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
                    description: 'Category ID'
                }
            ],
            responses: {
                200: {
                    description: 'Category deleted successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Category deleted successfully.'
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
                    description: 'Category not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Category not found.'
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
