const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")

const cors = require("cors")
const mongoose = require("mongoose")

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

module.exports = app
