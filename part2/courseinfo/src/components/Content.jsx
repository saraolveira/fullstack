import Part from "./Part.jsx"

const Content = ({ parts }) => {
    const total = parts.reduce((accumulator, part) => {
        return (accumulator += part.exercises)
    }, 0)

    return (
        <>
            {parts.map((part) => {
                return (
                    <Part
                        name={part.name}
                        exercises={part.exercises}
                        key={part.id}
                    />
                )
            })}
            <p>total of {total} exercises</p>
        </>
    )
}

export default Content
