import './Login.css'
import React, { useState } from 'react'
import { useUser } from '../context/useUser'
import { Link } from 'react-router-dom'

export default function Login() {
    const { login } = useUser()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const validate = (e) => {
        e.preventDefault()

        if (username.length > 0 && password.length > 0) {
            const data = {"username": username, "password": password}
            login(data)
        }
    }


  return (
<div id="login-container">
    <div id="login-form">
        <form onSubmit={validate}>
            <h3>Kirjaudu</h3>
            <div>
                <label>Käyttäjänimi</label>
                <input value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Salasana</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button>Kirjaudu</button>
        </form>
        <div id="register">
           <p> <Link to="/Register">Luo käyttäjätunnus</Link> </p>
        </div> 
    </div>
</div>
  )
}
