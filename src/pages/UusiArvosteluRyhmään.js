import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./UusiArvosteluRyhmään.css";

export default function UusiArvosteluRyhmään() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const { idreviews } = useParams();
  const [idgroup, setIdgroup] = useState("");
  const { userid, token } = useContext(UserContext);
  const navigate = useNavigate();
  async function setGroupRewiev() {

    try {
      const response = await axios.post(
        "http://localhost:3001/groupreviews",
        {
          idreviews: idreviews,
          idgroup: idgroup,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Arvostelu lisätty ryhmään");
      navigate("/arvostelut");
    } catch (error) {
      window.alert(error);
      
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
  function handleGroupChange(event) {
    const selectedIdgroup = event.target.value;
    setSelectedGroup(selectedIdgroup);
    setIdgroup(selectedIdgroup);
  }
  getGroups(userid);
  return (
    <div className="uusiarvostelu-container">
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
      <button onClick={setGroupRewiev}>Lähetä arvostelu</button>
    </div>
  );
}
