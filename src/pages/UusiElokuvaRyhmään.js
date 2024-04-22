import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UusiArvostelu.css";
import { UserContext } from "../context/UserContext";

export default function UusiElokuvaRyhmään() {
  const { mediaType, movieId, title } = useParams();
  const [text, setText] = useState("");
  const [idgroup, setIdgroup] = useState("");
  const { userid, token } = useContext(UserContext);
  const { userName, setUserName } = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  console.log(mediaType);
  console.log(movieId);
  console.log(title);
  console.log(userid);
  const navigate = useNavigate();

  async function setGroupMovie() {
    console.log(token);

    let serieid = "";
    let id = "";
    if (mediaType === "movie") {
      serieid = null;
      id = movieId;
    } else {
      serieid = movieId;
      id = null;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/groupmovies",
        {
          iduser: userid,
          idgroup: idgroup,
          movieid: id,
          serieid: serieid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Arvostelu lisätty");
      navigate("/");
    } catch (error) {
      window.alert(error);
      console.error(error);
    }
  }

  async function getGroups(userid) {
    try {
      const name = await nameFromId(userid);
      const response = await axios.get(
        `http://localhost:3001/group/groups?username=${name}`
      );
      const groupData = Object.values(response.data).map((group) => ({
        idgroup: group.idgroup,
        groupname: group.groupname,
      }));
      console.log(groupData);
      setGroups(groupData);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  async function nameFromId(idUser) {
    const url = `http://localhost:3001/user/oneuser?iduser=${idUser}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataArray = await response.json();

      const userData = dataArray[0];

      const username = userData.username;

      return username;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  useEffect(() => {
    getGroups(userid);
  }, [userid]);

  function handleGroupChange(event) {
    const selectedIdgroup = event.target.value;
    setSelectedGroup(selectedIdgroup);
    setIdgroup(selectedIdgroup);
  }
  return (
    <div className="uusielokuvaryhmääncontainer">
      <p>{mediaType}</p>
      <p>{movieId}</p>
      <p>{title}</p>
      <p>{userid}</p>
      <p>{userName}</p>
      <div>
        <label htmlFor="groupSelect">Select a group:</label>
        <select
          id="groupSelect"
          value={selectedGroup}
          onChange={handleGroupChange}
        >
          <option value="">Select...</option>
          {groups.map((group) => (
            <option key={group.idgroup} value={group.idgroup}>
              {group.groupname}
            </option>
          ))}
        </select>
      </div>
      <button onClick={setGroupMovie}>Lähetä elokuva</button>
    </div>
  );
}
