export default {
    Book: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1,
                description: 'Unique identifier for the book'
            },
            title: {
                type: 'string',
                example: 'The Great Gatsby',
                description: 'Title of the book'
            },
            description: {
                type: 'string',
                example: 'A novel by F. Scott Fitzgerald set in the Jazz Age',
                description: 'Description or summary of the book'
            },
            year: {
                type: 'integer',
                example: 1925,
                description: 'Year the book was published'
            },
            author: {
                type: 'string',
                example: 'F. Scott Fitzgerald',
                description: 'Author of the book'
            },
            publisher: {
                type: 'string',
                example: 'Charles Scribner\'s Sons',
                description: 'Publisher of the book'
            },
            created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the book was created'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the book was last updated'
            }
        }
    },
    BookInput: {
        type: 'object',
        required: ['title', 'description', 'year', 'author', 'publisher'],
        properties: {
            title: {
                type: 'string',
                example: 'The Great Gatsby',
                description: 'Title of the book'
            },
            description: {
                type: 'string',
                example: 'A novel by F. Scott Fitzgerald set in the Jazz Age',
                description: 'Description or summary of the book'
            },
            year: {
                type: 'integer',
                example: 1925,
                description: 'Year the book was published'
            },
            author: {
                type: 'string',
                example: 'F. Scott Fitzgerald',
                description: 'Author of the book'
            },
            publisher: {
                type: 'string',
                example: 'Charles Scribner\'s Sons',
                description: 'Publisher of the book'
            }
        }
    },
    Category: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1,
                description: 'Unique identifier for the category'
            },
            name: {
                type: 'string',
                example: 'Fiction',
                description: 'Name of the category'
            },
            created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the category was created'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the category was last updated'
            }
        }
    },
    CategoryInput: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                example: 'Fiction',
                description: 'Name of the category'
            }
        }
    },
    Author: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1,
                description: 'Unique identifier for the author'
            },
            first_name: {
                type: 'string',
                example: 'F. Scott',
                description: 'First name of the author'
            },
            last_name: {
                type: 'string',
                example: 'Fitzgerald',
                description: 'Last name of the author'
            },
            created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the author was created'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the author was last updated'
            }
        }
    },
    AuthorInput: {
        type: 'object',
        required: ['first_name', 'last_name'],
        properties: {
            first_name: {
                type: 'string',
                example: 'F. Scott',
                description: 'First name of the author'
            },
            last_name: {
                type: 'string',
                example: 'Fitzgerald',
                description: 'Last name of the author'
            }
        }
    },
    Publisher: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1,
                description: 'Unique identifier for the publisher'
            },
            name: {
                type: 'string',
                example: 'Charles Scribner\'s Sons',
                description: 'Name of the publisher'
            },
            created_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the publisher was created'
            },
            updated_at: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the publisher was last updated'
            }
        }
    },
    PublisherInput: {
        type: 'object',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                example: 'Charles Scribner\'s Sons',
                description: 'Name of the publisher'
            }
        }
    },
    User: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                example: 1,
                description: 'Unique identifier for the user'
            },
            email: {
                type: 'string',
                format: 'email',
                example: 'user@example.com',
                description: 'User\'s email address'
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
    },
    UserCredentials: {
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
    },
    AuthResponse: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: 'JWT token for authentication',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
        }
    },
    Error: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message'
            }
        }
    }
};