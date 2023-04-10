const Header = ({name}) => {
    return <h1>{name}</h1>
  }
  
  const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
  }
  
  const Content = ({parts}) => {
    console.log(parts)
  
    return <>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => {
      return sum + part.exercises, 0
    })
    console.log('total', parts)
    return <p>total of {total} exercises</p>
  }
  
  const Course = ({course}) => {
    console.log(course)
    return <>
      <Header name={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  }

  export default Course