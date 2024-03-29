import { useNavigate } from 'react-router-dom'
import './Login.css'
import React, { useState } from 'react'
import { useUser } from '../context/useUser'

export default function Login() {
    const { setUser } = useUser()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const validate = (e) => {
        e.preventDefault()
        if (username === 'admin' && password === 'admin') {
            setUser({user: username,password: password})
            navigate("/")
        }
    }


  return (
    <div id="login-form">
        <form onSubmit={validate}>
            <h3>Kirjaudu</h3>
            <div>
                <label>Käyttäjä</label>
                <input value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Salasana</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button>Kirjaudu</button>
        </form>
    </div>
  )
}
