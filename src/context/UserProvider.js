import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    const json = JSON.stringify(data);
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:3001/auth/login", json, options)
      .then((response) => {
        const token = response.data.jwtToken;
        const userid = response.data.userid;
        console.log(token);
        console.log(userid);
        setUserId(userid);
        setToken(token);
        setUser({ ...data, token: token, userid: userid });
        sessionStorage.setItem("user", user);
        sessionStorage.setItem("userId", userid);
        navigate("/");
      })
      .catch((error) => {
        alert("Käyttäjätunnus tai salasana väärä");
      });
  };

  const remove = async (username) => {
    axios.delete(`http://localhost:3001/user/deleteuser?username=${username}`);
    setUser(null);
    alert("Käyttäjä poistettu.");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, userid, token, login, remove }}
    >
      {children}
    </UserContext.Provider>
  );
}
