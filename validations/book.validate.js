import Joi from "joi";

export const bookSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    year: Joi.number().required().messages({
        'number.empty': 'Must be a number',
        'any.required': 'Year is required'
    }),
    author: Joi.string().required().messages({
        'string.empty': 'Author is required',
        'any.required': 'Author is required'
    }),
    publisher: Joi.string().required().messages({
        'string.empty': 'Publisher is required',
        'any.required': 'Publisher is required'
    })
})