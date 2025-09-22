export default {
    '/login': {
        post: {
            tags: ['Authentication'],
            summary: 'User login',
            description: 'Authenticate a user with email and password to get a JWT token',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    example: 'user@example.com',
                                    description: 'User\'s email address'
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                    example: 'securePassword123',
                                    description: 'User\'s password'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Authentication successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: {
                                        type: 'string',
                                        description: 'JWT token for authentication',
                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Authentication failed',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Invalid credentials',
                                        description: 'Error message'
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
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    },
    '/register': {
        post: {
            tags: ['Authentication'],
            summary: 'User registration',
            description: 'Register a new user with email and password',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    example: 'user@example.com',
                                    description: 'User\'s email address'
                                },
                                password: {
                                    type: 'string',
                                    format: 'password',
                                    example: 'securePassword123',
                                    description: 'User\'s password'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'User registered successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'User registered successfully',
                                        description: 'Success message'
                                    },
                                    user: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'integer',
                                                example: 1,
                                                description: 'User ID'
                                            },
                                            email: {
                                                type: 'string',
                                                example: 'user@example.com',
                                                description: 'User email'
                                            },
                                            created_at: {
                                                type: 'string',
                                                format: 'date-time',
                                                description: 'Date and time when the user was created'
                                            },
                                            updated_at: {
                                                type: 'string',
                                                format: 'date-time',
                                                description: 'Date and time when the user was last updated'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request - Invalid input data or email already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Email already in use',
                                        description: 'Error message'
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
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    }
};