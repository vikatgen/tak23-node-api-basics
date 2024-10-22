import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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