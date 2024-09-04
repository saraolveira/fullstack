const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (liked, blog) => {
        return liked.likes > blog.likes ? liked : blog
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
    let sorted = {}
    for (let blog of blogs) {
        if (sorted.hasOwnProperty(blog.author)) {
            sorted[blog.author] = sorted[blog.author] + 1
        } else {
            sorted[blog.author] = 1
        }
    }

    let authors = []

    for (let item in sorted) {
        authors.push({ author: item, blogs: sorted[item] })
    }

    let finalAuthor = {
        author: "",
        blogs: 0,
    }

    for (let author of authors) {
        if (author.blogs > finalAuthor.blogs) {
            finalAuthor = {
                author: author.author,
                blogs: author.blogs,
            }
        }
    }

    return finalAuthor
}

const mostLikes = (blogs) => {
    let sorted = {}
    for (let blog of blogs) {
        if (sorted.hasOwnProperty(blog.author)) {
            sorted[blog.author] = sorted[blog.author] + blog.likes
        } else {
            sorted[blog.author] = blog.likes
        }
    }

    let authors = []

    for (let item in sorted) {
        authors.push({ author: item, likes: sorted[item] })
    }

    let finalAuthor = {
        author: "",
        likes: 0,
    }

    for (let author of authors) {
        if (author.likes > finalAuthor.likes) {
            finalAuthor = {
                author: author.author,
                likes: author.likes,
            }
        }
    }

    return finalAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
