import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useUser } from '../context/useUser';

export default function Navbar() {
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
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
                <li>
                    <Link to="/omasivu">Oma Sivu</Link>
                </li>
            </ul>
            <div id='logindiv'>
                <ul>
                <li>
                    {user === null ? (
                        <Link to="/login">Kirjaudu</Link>
                    ) : (
                        <Link to="/logout">Kirjaudu ulos</Link>
                    )}
                </li>
                </ul>
            </div>
        </nav>
    );
}
