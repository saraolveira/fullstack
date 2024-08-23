const Form = ({
    submit,
    nameValue,
    numberValue,
    handleNameChange,
    handleNumberChange,
}) => {
    return (
        <form onSubmit={submit}>
            <div>
                name: <input value={nameValue} onChange={handleNameChange} />
            </div>
            <div>
                number:{" "}
                <input value={numberValue} onChange={handleNumberChange} />
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form
