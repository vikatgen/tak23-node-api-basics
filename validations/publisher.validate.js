import Joi from "joi";

export const publisherSchema = Joi.object({
    name: Joi.string().min(1).max(200).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 1 character long',
        'string.max': 'Name cannot exceed 200 characters',
        'any.required': 'Name is required'
    })
})
