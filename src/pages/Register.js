import React, { useState } from 'react'
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register_user() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const register = async (data) => {
        const json = JSON.stringify(data)
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post('http://localhost:3001/auth/register', json, options);
            console.log(response);
            alert("Käyttäjä luotiin. Voit nyt kirjautua sisään tunnuksellasi.");
            navigate("/login")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                console.error(error);
                alert("Virhe käyttäjän rekisteröinnissä");
            }
        }
    }

    const validate = async (e) => {
        e.preventDefault()

        if (username.length > 0 && password.length > 0) {
            const data = { "username": username, "password": password }
            await register(data);
            console.log(data);
        }
    }

    return (
        <div id="register-form">
            <form onSubmit={validate}>
                <h3>Luo käyttäjätunnus</h3>
                <div>
                    <label>Käyttäjänimi</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Salasana</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Luo</button>
            </form>
        </div>
    )
}
