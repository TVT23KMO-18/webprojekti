import "./Ryhmät.css";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Ryhmät() {
  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setDescription] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (user && user.username) {
          console.log("yeah");
          const response = await axios.get(
            `http://localhost:3001/group/groups?username=${user.username}`
          );
          const groupData = Object.values(response.data).map((group) => ({
            idgroup: group.idgroup,
            groupname: group.groupname,
          }));
          console.log(groupData);
          setGroups(groupData);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [user]);

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        if (!user) {
          const response = await axios.get(
            "http://localhost:3001/group/allgroups"
          );
          setAllGroups(response.data);
        } else {
          const response = await axios.get(
            `http://localhost:3001/group/groupsbyusername?username=${user.username}`
          );
          setAllGroups(response.data);
        }
      } catch (error) {
        console.error("Error fetching all groups:", error);
      }
    };
    fetchAllGroups();
  }, [user]);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleInputChangeTwo = (e) => {
    setDescription(e.target.value);
  };

  const ryhmä = async (e) => {
    e.preventDefault();
    const data = {
      username: user.username,
      groupname: groupName,
      description: groupDescription,
    };
    const jsonData = JSON.stringify(data);
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("http://localhost:3001/group", jsonData, options);
    } catch (error) {
      console.log("Error creating group:", error);
    }
  };

  return (
    <div className="ryhmatcontainer">
      <div>
        <h2>Ryhmät</h2>
      </div>
      {user ? (
        <div className="ryhma-grid-container">
          <div className="yksi">
            <p>Ryhmäsi</p>
            <ul>
              {groups.map((group, index) => (
                <li key={index}>
                  <Link
                    to={`/ryhmanomasivu/${group.idgroup}/${group.groupname}`}
                  >
                    {group.groupname}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="kaksi">
            <h4>Pyydä Liittyä Ryhmiin</h4>
            <table>
              <th>Ryhmän nimi</th>
              <th>Ryhmän kuvaus</th>
              {allGroups.map((group, index) => (
                <tr key={index}>
                  <td>{group.groupname}</td>
                  <td>{group.description}</td>
                </tr>
              ))}
            </table>
          </div>
          <div className="kolme">
            <p>Luo uusi ryhmä</p>
            <div className="ryhmanimi-input">
              <div>
                <input
                  required
                  placeholder="Ryhmän nimi"
                  value={groupName}
                  onChange={handleInputChange}
                ></input>
                <input
                  required
                  placeholder="Ryhmän kuvaus"
                  value={groupDescription}
                  onChange={handleInputChangeTwo}
                ></input>
                <button
                  onClick={ryhmä}
                  disabled={!groupName || !groupDescription}
                >
                  Luo ryhmä
                </button>
              </div>
            </div>
          </div>
          <div className="liittymispyynnot">
            <div>
              <p>Liittymispyynnöt</p>
              <p>Hyväksy</p>
              <p>Hylkää</p>
            </div>
            <div>
              <p>Ryhmä 1</p>
              <p>Kyllä</p>
              <p>Ei</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="ryhmat-ei-kirjautunut">
          <p>Muiden ryhmät</p>
          <table>
            <th>Ryhmän nimi</th>
            <th>Ryhmän kuvaus</th>
            {allGroups.map((group, index) => (
              <tr key={index}>
                <td>{group.groupname}</td>
                <td>{group.description}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
