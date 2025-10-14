import Joi from "joi";

export const authorSchema = Joi.object({
    first_name: Joi.string().min(1).max(100).required().messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 1 character long',
        'string.max': 'First name cannot exceed 100 characters',
        'any.required': 'First name is required'
    }),
    last_name: Joi.string().min(1).max(100).required().messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 1 character long',
        'string.max': 'Last name cannot exceed 100 characters',
        'any.required': 'Last name is required'
    })
})
