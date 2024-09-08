const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body)

    if (!request.body.title) {
        return response.status(400).json({ error: "title missing" })
    }

    if (!request.body.url) {
        return response.status(400).json({ error: "url missing" })
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
