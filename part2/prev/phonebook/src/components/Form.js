const Form = ({submit, nameValue, handleName, phoneValue, handlePhone}) => {
    return <form onSubmit={submit}>
        <div>
        name: <input value={nameValue} onChange={handleName}/>
        </div>
        <div>
        number: <input value={phoneValue} onChange={handlePhone}/>
        </div>
        <div>
        <button type="submit">add</button>
        </div>
  </form>
}
    
export default Form