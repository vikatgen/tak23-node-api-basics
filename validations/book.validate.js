import Joi from "joi";

export const bookSchema = Joi.object({
    title: Joi.string().min(1).max(255).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least 1 character long',
        'string.max': 'Title cannot exceed 255 characters',
        'any.required': 'Title is required'
    }),
    description: Joi.string().min(1).required().messages({
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 1 character long',
        'any.required': 'Description is required'
    }),
    year: Joi.number().integer().min(1000).max(9999).required().messages({
        'number.base': 'Year must be a number',
        'number.integer': 'Year must be an integer',
        'number.min': 'Year must be at least 1000',
        'number.max': 'Year cannot exceed 9999',
        'any.required': 'Year is required'
    }),
    authorIds: Joi.array().items(Joi.number().integer().positive()).min(1).required().messages({
        'array.base': 'Author IDs must be an array',
        'array.min': 'At least one author is required',
        'any.required': 'Author IDs are required'
    }),
    categoryIds: Joi.array().items(Joi.number().integer().positive()).min(1).required().messages({
        'array.base': 'Category IDs must be an array',
        'array.min': 'At least one category is required',
        'any.required': 'Category IDs are required'
    }),
    publisherId: Joi.number().integer().positive().required().messages({
        'number.base': 'Publisher ID must be a number',
        'number.integer': 'Publisher ID must be an integer',
        'number.positive': 'Publisher ID must be positive',
        'any.required': 'Publisher ID is required'
    })
})