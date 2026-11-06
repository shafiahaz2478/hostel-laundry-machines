// AI generated for error message display

function ErrorMessage({message}){
    if (!message) return null
    return <p className="error-msg" role="alert">{message}</p>
}

export default ErrorMessage
