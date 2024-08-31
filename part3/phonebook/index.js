require("dotenv").config()

const express = require("express")
const app = express()

const Person = require("./models/person")

const morgan = require("morgan")
const cors = require("cors")

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())

morgan.token("ob", function (req, res) {
    console.log("ob", req.body)
    return `${JSON.stringify(req.body)}`
})

app.use(morgan(":method :url :status :response-time :req[header] :ob"))

// let people = [
//     {
//         id: "1",
//         name: "Arto Hellas",
//         number: "040-123456",
//     },
//     {
//         id: "2",
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//     },
//     {
//         id: "3",
//         name: "Dan Abramov",
//         number: "12-43-234345",
//     },
//     {
//         id: "4",
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//     },
// ]

app.get("/api/persons", (request, response) => {
    Person.find({}).then((people) => {
        response.json(people)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const name = request.body.name
    const number = request.body.number

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

    const person = new Person({
        name: name,
        number: number,
    })

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson)
            console.log(savedPerson)
        })
        .catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: "query" }
    )
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => next(error))
})

app.get("/info", (request, response, next) => {
    const date = new Date()

    Person.estimatedDocumentCount({})
        .then((length) => {
            response.send(
                `<p>Phonebook has info for ${length} people</p><p>${date}</p>`
            )
        })
        .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
