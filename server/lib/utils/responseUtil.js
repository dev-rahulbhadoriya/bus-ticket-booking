const successResponse = (data, message, output) => ({
    error: false,
    data,
    message,
    output,
});

const errorResponse = (data, message, output) => ({
    error: true,
    data,
    message,
});

module.exports = {
    successResponse,
    errorResponse,
};
