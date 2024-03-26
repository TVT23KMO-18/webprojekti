import React from 'react'
import { Navigate } from 'react-router-dom'

export default function About({user}) {
if(user === null) {
    return <Navigate to="/"/>
}


  return (
    <p>This is About</p>
  )
}
