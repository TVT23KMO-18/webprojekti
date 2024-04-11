import './OmaSivu.css'
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Poistakayttaja() {

  const { user, remove } = useContext(UserContext);


  const poista = (e) => {

    e.preventDefault()
    const username = user.username
    const answer = window.confirm('Haluatko varmasti poistaa käyttäjän?')
    if(answer) {
      remove(username)
    } else {
      return
    }

  }


  return (
    <div className="container">
        <button onClick={poista} id="delete">Poista Käyttäjä</button>
    </div>
  )
}