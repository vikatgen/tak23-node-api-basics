export const validate = (schema) => (request, response, next) => {

    const { error } = schema.validate(request.body, {
        abortEarly: false,
        errors: {
            wrap: {
                label: false
            }
        }
    })

    if (error) {
        const errorbag = error.details.reduce((acc, detail) => {
            const field = detail.path.join('.')
            acc[field] = detail.message
            return acc
        }, {})

        return response.status(400).json({
            message: typeof error === "ValidationError" ? error.message : "ValidationError",
            errors: { ...errorbag }
        })
    }

    next()

}
