import authRouter from "./auth"

const initRoute = (app) => {
    app.use("/api/v1/auth", authRouter )

    return app.use("/", (req, res) => {
        res.send("server onnnn")
    })
}

export default initRoute;