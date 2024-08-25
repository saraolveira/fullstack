const Error = ({ message }) => {
    {
        if (message === null) {
            return null
        }

        return <div className="error message">{message}</div>
    }
}

export default Error
