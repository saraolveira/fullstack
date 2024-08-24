import Person from "./Person.jsx"
const People = ({ people, deletePerson }) => {
    return (
        <>
            {people.map((person) => (
                <Person
                    key={person.name}
                    name={person.name}
                    number={person.number}
                    deletePerson={() => deletePerson(person.id, person.name)}
                />
            ))}
        </>
    )
}

export default People
