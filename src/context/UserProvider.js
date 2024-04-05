import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function UserProvider({children}) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async(data) => {
    const json = JSON.stringify(data)
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.post('http://localhost:3001/auth/login', json, options)
      .then(response => {
        const token = response.data.jwtToken
        console.log(token)
        setUser({...data, "token":token})
        sessionStorage.setItem("user", user)
        navigate("/")
      })
      .catch(error => {
        throw error
      })
  }

  return (
    <UserContext.Provider value ={{user,setUser,login}}> 
    { children }
    </UserContext.Provider>
  )
}
