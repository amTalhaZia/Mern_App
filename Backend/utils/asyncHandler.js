const asyncHandler = (fn) => (async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error(error); // Debugging ke liye error log karain
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
});

export default asyncHandler;
