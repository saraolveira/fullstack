const Successfull = ({ message }) => {
    {
        if (message === null) {
            return null
        }

        return <div className="message success">{message}</div>
    }
}

export default Successfull
