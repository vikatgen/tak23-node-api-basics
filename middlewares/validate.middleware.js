export const validate = (schema) => (request, response, next) => {

    const { error } = schema.validate(request.body)

    if (error) {
        return response.status(400).json({
            message: "Something went wrong",
            error
        })
    }

    next()

}
