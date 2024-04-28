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
  const [groupRequest, setGroupRequest] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (user && user.username) {
          // console.log(user.username);

          const response = await axios.get(
            `http://localhost:3001/group/groups?username=${user.username}`
          );

          const groupData = Object.values(response.data).map((group) => ({
            idgroup: group.idgroup,
            groupname: group.groupname,
          }));

          setGroups(groupData);
          getrequests();
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
      alert("Ryhmä luotu");
      const response = await axios.get(
        `http://localhost:3001/group/groups?username=${user.username}`
      );

      const groupData = Object.values(response.data).map((group) => ({
        idgroup: group.idgroup,
        groupname: group.groupname,
      }));

      setGroups(groupData);
      getrequests();
    } catch (error) {
      console.log("Error creating group:", error);
    }
  };
  //********************************************************** */
  async function getrequests() {
    const käyttäjännimi = user.username;

    try {
      const url = `http://localhost:3001/group/groupsbyowner/${käyttäjännimi}`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      const groups = [];
      for (const item of data) {
        const idgroup = item.idgroup;
        const groupName = item.groupname;

        const requestUrl = `http://localhost:3001/grouprequest/${idgroup}`;
        const requestResponse = await fetch(requestUrl);
        const requestDataArray = await requestResponse.json();
        for (const requestItem of requestDataArray) {
          const idrequest = requestItem.idgroup_request;
          const iduser = requestItem.iduser;
          const username = await nameFromId(iduser);

          groups.push({
            groupName,
            idrequest,
            iduser,
            idgroup,
            username,
          });
        }
      }

      // console.log(groups);
      setGroupRequest(groups);
    } catch (error) {
      console.error("Fetch error:", error);
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
  async function declineRequest(idrequest) {
    // console.log(idrequest + " deleted");
    deleteRequest(idrequest);
    await getrequests();
  }
  async function acceptRequest(idrequest, idUser, idgroup) {
    //console.log(idrequest, idUser, idgroup);
    await addMember(idrequest, idUser, idgroup);
    await deleteRequest(idrequest);
    await getrequests();
  }

  async function deleteRequest(idrequest) {
    const deleteUrl = `http://localhost:3001/grouprequest/delete/${idrequest}`;
    try {
      const response = await axios.delete(deleteUrl);
      //console.log(response.data);
      //console.log(idrequest);
    } catch (error) {
      throw error;
    }
  }
  async function addMember(idrequest, idUser, idGroup) {
    try {
      const response = await axios.post(
        "http://localhost:3001/groupmembership",
        {
          idUser: idUser,
          idGroup: idGroup,
        }
      );
      // console.log("Jäsen lisätty");
    } catch (error) {
      throw error;
    }
  }

  async function addRequest(idgroup, iduser, index) {
    try {
      const requestUrl = `http://localhost:3001/grouprequest/${idgroup}`;
      const requestResponse = await fetch(requestUrl);
      const requestDataArray = await requestResponse.json();
      if (requestDataArray.length === 0) {
        await postRequest(idgroup, iduser);
      } else {
        for (const requestItem of requestDataArray) {
          const testiduser = requestItem.iduser;
          const testidgroup = requestItem.idgroup;

          if ((testiduser !== iduser) & (testidgroup !== idgroup)) {
            await postRequest(idgroup, iduser);
          } else {
            window.alert(
              "Olet jo lähettäny liittymispyynnän kyseiseen ryhmään"
            );
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async function postRequest(idgroup, iduser) {
    try {
      iduser = await nameToUserId(user.username);

      const response = await axios.post(
        "http://localhost:3001/grouprequest/add",
        {
          idUser: iduser,
          idGroup: idgroup,
        }
      );
      window.alert("Liittymispyyntö lähetetty");
    } catch (error) {
      throw error;
    }
  }

  async function nameToUserId(username) {
    try {
      const url = `http://localhost:3001/user/username/${username}`;
      const response = await fetch(url);

      const data = await response.json();
      //console.log("Response Data:", data);

      const iduser = data[0].iduser;

      return iduser;
    } catch (error) {
      throw error;
    }
  }

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
                  <button onClick={() => addRequest(group.idgroup, index)}>
                    Lähetä liittymispyynntö
                  </button>
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
          {groupRequest.length > 0 ? (
            <div className="liittymispyynnot">
              <div>
                <h3>Liittymispyynnöt</h3>
              </div>
              <div>
                {groupRequest.map((request, index) => (
                  <div key={index} className="requests">
                    <p>{request.groupName}</p>
                    <p>{request.username}</p>

                    <button
                      onClick={() =>
                        acceptRequest(
                          request.idrequest,
                          request.iduser,
                          request.idgroup
                        )
                      }
                    >
                      Hyväksy
                    </button>
                    <button onClick={() => declineRequest(request.idrequest)}>
                      Hylkää
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <div className="ryhmat-ei-kirjautunut">
          <p>Muiden ryhmät</p>
          <table>
            <thead>
              <tr>
                <th>Ryhmän nimi</th>
                <th>Ryhmän kuvaus</th>
              </tr>
            </thead>
            <tbody>
              {allGroups.map((group, index) => (
                <tr key={index}>
                  <td>{group.groupname}</td>
                  <td>{group.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
