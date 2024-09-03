import { useState, useEffect } from "react"
import phonebookService from "./services/phonebook.js"
import People from "./components/People.jsx"
import Filter from "./components/Filter.jsx"
import Form from "./components/Form.jsx"
import Successfull from "./components/Successful.jsx"
import Error from "./components/Error.jsx"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [filter, setFilter] = useState("")
    const [successMessage, setSuccessMesage] = useState(null)
    const [errorMessage, setErrorMesage] = useState(null)

    useEffect(() => {
        phonebookService.getAll().then((initialPhonebook) => {
            setPersons(initialPhonebook)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
        }

        const number = persons.find((p) => p.name === newName)
        const changedNumber = { ...number, number: newNumber }
        const id = changedNumber.id

        if (persons.find((p) => p.name === newName)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                phonebookService
                    .update(id, changedNumber)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== id ? person : returnedPerson
                            )
                        )
                        setSuccessMesage(`${newName}'s number was updated`)
                        setTimeout(() => {
                            setSuccessMesage(null)
                        }, 5000)
                        setNewName("")
                        setNewNumber("")
                    })
                    .catch((error) => {
                        setErrorMesage(
                            `Information of ${newName} has already been removed from server`
                        )
                        setTimeout(() => {
                            setErrorMesage(null)
                        }, 5000)
                        setNewName("")
                        setNewNumber("")
                    })

                return
            } else {
                alert(
                    `${newName} is already added to phonebook and you don't want to replace the number. Use a different name`
                )
                setNewName("")
                setNewNumber("")
                return
            }
        }

        phonebookService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson))
                setSuccessMesage(`Added ${newName}`)
                setTimeout(() => {
                    setSuccessMesage(null)
                }, 5000)
                setNewName("")
                setNewNumber("")
            })
            .catch((error) => {
                setErrorMesage(error.response.data.error)
                setTimeout(() => {
                    setErrorMesage(null)
                }, 5000)
                setNewName("")
                setNewNumber("")
            })
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name} ?`)) {
            // console.log(`delete ${id}`)
            phonebookService.remove(id).then(() => {
                // console.log(` ${name} has been deleted`)
                phonebookService.getAll().then((updatedPhonebook) => {
                    setPersons(updatedPhonebook)
                })
            })
        }
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
            <Successfull message={successMessage} />
            <Error message={errorMessage} />
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

            <People people={filteredPeople} deletePerson={deletePerson} />
        </div>
    )
}

export default App
