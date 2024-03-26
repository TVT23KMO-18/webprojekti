import { useNavigate } from 'react-router-dom'
import './Login.css'
import React, { useState } from 'react'

export default function Login({setUser}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const validate = (e) => {
        e.preventDefault()
        if (username === 'admin' && password === 'admin') {
            setUser({user: username,password: password})
            navigate("/home")
        }
    }


  return (
    <div id="login-form">
        <form onSubmit={validate}>
            <h3>Login</h3>
            <div>
                <label>User</label>
                <input value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button>Submit</button>
        </form>
    </div>
  )
}
