const Filter = ({filter, handleChange}) => {
console.log(filter)
    return <div>filter shown with <input value={filter} onChange={handleChange}/></div>
}

export default Filter