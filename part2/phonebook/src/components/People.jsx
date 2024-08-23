import Person from "./Person.jsx"
const People = ({ people }) => {
    return (
        <>
            {people.map((person) => (
                <Person
                    key={person.name}
                    name={person.name}
                    number={person.number}
                />
            ))}
        </>
    )
}

export default People
