const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe("getting blogs", () => {
    test("the application returns the correct amount of blog posts in JSON format", async () => {
        const response = await api
            .get("/api/blogs")
            .expect("Content-Type", /application\/json/)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test("the unique identifier property of the blog posts is named id", async () => {
        const response = await api.get("/api/blogs")

        assert.ok(response.body[0].id)
    })
})

describe("posting blogs", () => {
    test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "http://newblog.com",
            likes: 0,
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map((blog) => blog.title)
        assert(titles.includes(newBlog.title))
    })

    test("if likes property is missing from the request, it will default to 0", async () => {
        const newBlog = {
            title: "New blog",
            author: "New author",
            url: "http://newblog.com",
        }

        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogCreated = response.body

        assert.strictEqual(blogCreated.likes, 0)
    })

    test("if the title property is missing, the backend respondes with status code 400", async () => {
        const newBlog = {
            author: "New author",
            url: "http://newblog.com",
        }

        await api.post("/api/blogs").send(newBlog).expect(400)
    })

    test("if the url property is missing, the backend respondes with status code 400", async () => {
        const newBlog = {
            title: "New title",
            author: "New author",
        }

        await api.post("/api/blogs").send(newBlog).expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})
