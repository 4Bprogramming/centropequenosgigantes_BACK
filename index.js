require("dotenv").config()
const express = require("express")
const port = process.env.port || 3030
// require("./db/config") // se trae aca la config de la DB

const server = express()
server.use(express.json())


//test if this works
server.get("/", (req, res) => {
    const content = `
    <h1>Server con Express</h1>
    <p>Hola ke asé</p>
    `
    res.send(content)
});

//Users router
// server.use("/users", require("./users/usersRoute")) ---> aca se configuran las rutas

//404
server.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 404
    next(error)

})

//Error handler
server.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
    }
    res.status(error.status).json({ status: error.status, message: error.message })
})


//listen
server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`Servidor en http://localhost:${port}`)
})
