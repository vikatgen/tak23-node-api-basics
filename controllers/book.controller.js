import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export const getAllBooks = async (request, response) => {

    try {
        const { 
            title, 
            author, 
            publisher, 
            year, 
            minYear, 
            maxYear, 
            category, 
            search,
            page = 1,
            limit = 10
        } = request.query

        // Build where conditions
        const whereConditions = {}

        // Text-based filters (case-insensitive partial matching)
        if (title) {
            whereConditions.title = {
                contains: title,
                mode: 'insensitive'
            }
        }

        if (author) {
            whereConditions.author = {
                contains: author,
                mode: 'insensitive'
            }
        }

        if (publisher) {
            whereConditions.publisher = {
                contains: publisher,
                mode: 'insensitive'
            }
        }

        // Year filters
        if (year) {
            whereConditions.year = parseInt(year)
        } else {
            // Range filters for year
            const yearConditions = {}
            if (minYear) yearConditions.gte = parseInt(minYear)
            if (maxYear) yearConditions.lte = parseInt(maxYear)
            if (Object.keys(yearConditions).length > 0) {
                whereConditions.year = yearConditions
            }
        }

        // Category filter
        if (category) {
            whereConditions.categories = {
                some: {
                    category: {
                        name: {
                            contains: category,
                            mode: 'insensitive'
                        }
                    }
                }
            }
        }

        // Global search across title, author, description, and publisher
        if (search) {
            whereConditions.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { publisher: { contains: search, mode: 'insensitive' } }
            ]
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit)
        const take = parseInt(limit)

        // Get total count for pagination info
        const totalBooks = await prisma.book.count({ where: whereConditions })
        
        const books = await prisma.book.findMany({
            where: whereConditions,
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            },
            skip,
            take
        })

        // Transform the response to include category names directly
        const transformedBooks = books.map(book => ({
            ...book,
            categories: book.categories.map(bc => bc.category.name)
        }))

        response.status(200).json({
            books: transformedBooks,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalBooks / take),
                totalBooks,
                limit: take,
                hasNext: skip + take < totalBooks,
                hasPrevious: parseInt(page) > 1
            },
            filters: {
                title,
                author,
                publisher,
                year,
                minYear,
                maxYear,
                category,
                search
            }
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something went wrong while fetching books.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }

}

export const getBook = async (request, response) => {

    try {

        const { id } = request.params

        const book = await prisma.book.findUnique({
            where: { 
                id: Number(id) 
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        })

        if (!book) {
            return response.status(404).json({
                message: "Book not found."
            })
        }

        // Transform the response to include category names directly
        const transformedBook = {
            ...book,
            categories: book.categories.map(bc => bc.category.name)
        }

        response.status(200).json({
            book: transformedBook
        })

        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        }) 
    }

}

export const createBook = async (request, response) => {
    const { title, description, year, author, publisher } = request.body;

    try {

        const newBook = await prisma.book.create({
            data: {
                title: title,
                description: description,
                year: year,
                author: author,
                publisher: publisher
            }
        })

        response.status(201).json({
            message: "Book created successfully.",
            newBook
        })        
        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }
}

export const updateBook = async (request, response) => {
    const { title, description, year, author, publisher } = request.body;
    const { id } = request.params

    try {
        
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                year,
                author,
                publisher
            }
        })

        response.status(200).json({
            message: "Book updated successfully.",
            updatedBook
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }
}

export const deleteBook = async (request, response) => {

    try {
        
        const { id } = request.params;

        await prisma.book.delete({
            where: { 
                id: Number(id) 
            }
        })

        response.status(200).json({
            message: "Book deleted successfully.",
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something happening. Bad luck."
        })
    }

}

export const getCategories = async (request, response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                _count: {
                    select: {
                        books: true
                    }
                }
            }
        })

        const transformedCategories = categories.map(category => ({
            id: category.id,
            name: category.name,
            bookCount: category._count.books
        }))

        response.status(200).json({
            categories: transformedCategories
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something went wrong while fetching categories.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }

}

export const getBookStats = async (request, response) => {
    try {
        const totalBooks = await prisma.book.count()
        const totalCategories = await prisma.category.count()
        
        // Get books per year
        const booksByYear = await prisma.book.groupBy({
            by: ['year'],
            _count: {
                id: true
            },
            orderBy: {
                year: 'desc'
            }
        })

        // Get top authors (by book count)
        const topAuthors = await prisma.book.groupBy({
            by: ['author'],
            _count: {
                id: true
            },
            orderBy: {
                _count: {
                    id: 'desc'
                }
            },
            take: 10
        })

        response.status(200).json({
            stats: {
                totalBooks,
                totalCategories,
                booksByYear: booksByYear.map(item => ({
                    year: item.year,
                    count: item._count.id
                })),
                topAuthors: topAuthors.map(item => ({
                    author: item.author,
                    bookCount: item._count.id
                }))
            }
        })

    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: "Something went wrong while fetching book statistics.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
