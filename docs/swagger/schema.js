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