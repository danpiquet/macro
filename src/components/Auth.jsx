import { useState } from "react"
import axios from "axios"

const Auth = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
const body = {
    username,
    password
}

        axios.post(register ? '/api/register' : '/api/login', body)
        .then(res => console.log(res.data))
        .catch(err => alert(err.response.data))
    }

  return (
    <div>
        {register ? (
            <form onSubmit={e => handleSubmit(e)}>
                <h2>Welcome to macro. Please Register</h2>
                <input placeholder="username" onChange={e => setUsername(e.target.value)}/>
                <input placeholder="password" onChange={e => setPassword(e.target.value)}/>
                <button>Register</button>
            </form>
        ) : (
            <form onSubmit={e => handleSubmit(e)}>
            <h2>Welcome to macro. Please Sign In</h2>
            <input placeholder="username" onChange={e => setUsername(e.target.value)}/>
            <input placeholder="password" onChange={e => setPassword(e.target.value)}/>
            <button>Sign In</button>
        </form>
        )}
        <button onClick={() => setRegister(!register)}>Need to {register ? "Login?" : "Register?"}</button>
    </div>
  )
}

export default Auth