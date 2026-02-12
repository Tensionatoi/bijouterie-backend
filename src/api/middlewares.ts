import { defineMiddlewares } from "@medusajs/medusa"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/*",
            middlewares: [
                (req, res, next) => {
                    res.removeHeader("X-Powered-By")
                    next()
                },
            ],
        },
    ],
})
