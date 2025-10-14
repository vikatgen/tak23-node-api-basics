import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 1 character long',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
    })
})
