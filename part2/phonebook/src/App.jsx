import { useState, useEffect } from "react"
import axios from "axios"
import People from "./components/People.jsx"
import Filter from "./components/Filter.jsx"
import Form from "./components/Form.jsx"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
        }

        const allNames = persons.map((person) => person.name)
        if (allNames.includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            setNewName("")
            setNewNumber("")
            return
        }
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber("")
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const filteredPeople =
        filter === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(filter.toLowerCase())
              )

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h2>add a new</h2>
            <Form
                submit={addPerson}
                nameValue={newName}
                numberValue={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            ></Form>
            {/* <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form> */}
            <h2>Numbers</h2>

            <People people={filteredPeople} />
        </div>
    )
}

export default App
