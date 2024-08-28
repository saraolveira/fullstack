const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))

morgan.token("ob", function (req, res) {
    console.log("ob", req.body)
    return `${JSON.stringify(req.body)}`
})

app.use(morgan(":method :url :status :response-time :req[header] :ob"))

let people = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
]

// app.get("/", (request, response) => {
//     response.send("<h1>Go to /api/persons</h1>")
// })

app.get("/api/persons", (request, response) => {
    response.json(people)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = people.find((person) => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    people = people.filter((person) => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const name = request.body.name
    const number = request.body.number
    const id = String(Math.floor(Math.random() * 100))

    if (people.some((person) => person.name === name)) {
        return response.status(400).json({
            error: "name must be unique",
        })
    }

    if (!name) {
        return response.status(400).json({
            error: "name is missing",
        })
    }

    if (!number) {
        return response.status(400).json({
            error: "number is missing",
        })
    }

    const person = {
        name: name,
        number: number,
        id: id,
    }

    people = people.concat(person)

    response.json(person)
})

app.get("/info", (request, response) => {
    const date = new Date()
    response.send(
        `<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
