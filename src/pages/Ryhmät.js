import './Ryhmät.css'
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios";

export default function Ryhmät() {

  const { user } = useContext(UserContext);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/group/groups?username=${user.username}`);
        const groupNames = Object.values(response.data).map(group => group.groupname);
        setGroups(groupNames);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [user.username]);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  }

  const ryhmä = async (e) => {
    e.preventDefault();
    console.log(groupName)
    console.log(user.username)

    const data = {
      username: user.username,
      groupname: groupName
    }

    const jsonData = JSON.stringify(data)
    
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      await axios.post('http://localhost:3001/group', jsonData, options);

    } catch(error) {
      console.log("Error creating group:", error);
    }
  }

  return (
    <div className='ryhmatcontainer'>
      <div>
        <h2>Ryhmät</h2>
      </div>
      <div className='ryhma-grid-container'>
        <div className='yksi'>
          <p>Ryhmäsi</p>
          <ul>
            {groups.map((group, index) => (
              <li key={index}>{group}</li>
            ))}
          </ul>
        </div>
        <div className='kaksi'>
          <p>Liity ryhmään</p>
          <ul>
            <li>Ryhmä 1</li>
            <li>Ryhmä 2</li>
            <li>Ryhmä 3</li>
          </ul>
        </div>
        <div className='kolme'>
          <p>Luo uusi ryhmä</p>
            <div className='ryhmanimi-input'>
              <p>Ryhmän nimi:</p>
              <div>
                <input value={groupName} onChange={handleInputChange}></input>
                <button onClick={ryhmä}>Luo ryhmä</button>
              </div>
            </div>
        </div>
        <div className='liittymispyynnot'>
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
    </div>
  );
}
