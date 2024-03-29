import { Link } from 'react-router-dom'
import './Navbar.css'
import React from 'react'
import { useUser } from '../context/useUser'
export default function Navbar({}) {
    const { user } = useUser()
  return (
    <nav>
        <div>
            <ul>
                <li>
                    <Link to="/">Etusivu</Link>
                </li>
                <li>
                    <Link to="/Ryhmät">Ryhmät</Link>
                </li>
                <li>
                    <Link to="/suosikit">Suosikit</Link>
                </li>
                <li>
                    <Link to="/arvostelut">Arvostelut</Link>
                </li>
                <li>
                    <Link to="/näytökset">Näytökset</Link>
                </li>
                <li>
                    <Link to="/haku">Haku</Link>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li>
                    {user === null &&
                     <Link to="/login">Kirjaudu</Link>
                    }
                    {user &&
                     <Link to="/logout">Kirjaudu ulos</Link>
                    }
                </li>
            </ul>
        </div>
    </nav>
  )
}
