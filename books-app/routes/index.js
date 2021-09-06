module.exports = app => {

    // Base URL's
    app.use("/", require("./user.routes"))
    app.use("/", require("./base.routes"))
    app.use("/libros", require("./books.routes"))
    app.use("/autores", require("./authors.routes"))
    app.use("/", require("./auth.routes"))
}