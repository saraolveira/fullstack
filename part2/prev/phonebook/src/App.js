import { useState } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import People from './components/People.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhone
    }

    const allNames = persons.map(person => person.name)
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }


  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filterPeople = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log(filterPeople)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilter}/>
      <h2>add a new</h2>
      <Form 
        submit={addName} 
        nameValue={newName} 
        handleName={handleName}
        phoneValue={newPhone} 
        handlePhone={handlePhone} 
      ></Form>
      <h2>Numbers</h2>
      <People persons={filterPeople}/>
    </div>
  )
}

export default App
