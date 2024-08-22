import Person from "./Person.js"
const People = ({persons}) => {

    return <>
        {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
    </>
}

export default People