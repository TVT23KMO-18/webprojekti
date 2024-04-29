import React, { useContext, useState, useEffect } from "react";
import "./Näytökset.css";
import DateSelect from "../components/DateSelect";
import Popup from "./Popup";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Näytökset() {
  const { userid, token } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [areaId, setAreaId] = useState("1018");
  const [selectedDate, setSelectedDate] = useState("");

  const [triggerState, setTrigger] = useState(false);
  const [theatre, setTheatre] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [urlToShow, setUrlToShow] = useState("");
  const [eventId, setEventId] = useState("");

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [idgroup, setIdgroup] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const url = `https://www.finnkino.fi/xml/Schedule/?area=${areaId}&dt=${selectedDate}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch schedule. Status code: ${response.status}`
          );
        }
        return response.text();
      })
      .then((xmlData) => {
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");

        const showElements = xmlDoc.querySelectorAll("Show");
        const moviesData = [];
        showElements.forEach((showElement) => {
          const titleElement = showElement.querySelector("Title");
          const title = titleElement.textContent;

          const ratingElement = showElement.querySelector("RatingImageUrl");
          const rating = ratingElement.textContent;

          const showStartElement = showElement.querySelector("dttmShowStart");
          const showStart = showStartElement.textContent;
          let date = new Date(showStart);
          date = date.toLocaleTimeString("fi-FI", {
            timeZone: "Europe/Helsinki",
            hour: "2-digit",
            minute: "2-digit",
          });

          const eventSmallImagePortrait = showElement.querySelector(
            "EventSmallImagePortrait"
          );
          const imageUrl = eventSmallImagePortrait.textContent;

          const ShowURLElement = showElement.querySelector("ShowURL");
          const ShowURL = ShowURLElement.textContent;
          const eventIdElement = showElement.querySelector("EventID");
          const eventID = eventIdElement.textContent;
          const TheatreAuditoriumElement = showElement.querySelector(
            "TheatreAndAuditorium"
          );
          const TheatreAuditorium = TheatreAuditoriumElement.textContent;
          moviesData.push({
            title,
            rating,
            date,
            imageUrl,
            ShowURL,
            TheatreAuditorium,
            eventID,
            showStart,
          });
        });

        setMovies(moviesData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [areaId, selectedDate]);

  const handleAreaChange = (e) => {
    setAreaId(e.target.value);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  async function setGroupEvent() {

    try {
      const response = await axios.post(
        "http://localhost:3001/groupevents",
        {
          eventid: eventId,
          idgroup: idgroup,
          startingtime: startingTime,
          urltoshow: urlToShow,
          theatre: theatre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Näytös lisätty ryhmään");
    } catch (error) {
      window.alert(error);
      console.error(error);
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
  function handleGroupChange(event) {
    const selectedIdgroup = event.target.value;
    setSelectedGroup(selectedIdgroup);
    setIdgroup(selectedIdgroup);
  }
  return (
    <div className="näytöksetcontainer">
      <div className="selectit">
        <div>
          <select name="areaId" value={areaId} onChange={handleAreaChange}>
            <option value="1029">Valitse alue/teatteri</option>
            <option value="1014">Pääkaupunkiseutu</option>
            <option value="1012">Espoo</option>

            <option value="1039">Espoo: OMENA</option>

            <option value="1038">Espoo: SELLO</option>

            <option value="1002">Helsinki</option>

            <option value="1045">Helsinki: ITIS</option>

            <option value="1031">Helsinki: KINOPALATSI</option>
            <option value="1032">Helsinki: MAXIM</option>

            <option value="1033">Helsinki: TENNISPALATSI</option>

            <option value="1013">Vantaa: FLAMINGO</option>
            <option value="1015">Jyväskylä: FANTASIA</option>

            <option value="1016">Kuopio: SCALA</option>

            <option value="1038">Espoo: SELLO</option>
            <option value="1012">Espoo</option>

            <option value="1039">Espoo: OMENA</option>

            <option value="1038">Espoo: SELLO</option>
            <option value="1017">Lahti: KUVAPALATSI</option>

            <option value="1041">Lappeenranta: STRAND</option>

            <option value="1018">Oulu: PLAZA</option>

            <option value="1012">Pori: PROMENADI</option>

            <option value="1021">Tampere</option>

            <option value="1034">Tampere: CINE ATLAS</option>

            <option value="1035">Tampere: PLEVNA</option>

            <option value="1047">Turku ja Raisio</option>

            <option value="1022">Turku: KINOPALATSI</option>

            <option value="1046">Raisio: LUXE MYLLY</option>
          </select>
        </div>
        <div>
          <DateSelect onSelect={handleDateSelect} />
        </div>
      </div>
      <div className="virhediv">
        {movies.length === 0 && <h2>Ei näytöksiä</h2>}
      </div>
      {movies.map((movie, index) => (
        <div key={index} className="moviediv">
          <div className="kuva">
            <img src={movie.imageUrl} alt="movieimge" />
          </div>
          <div className="row">
            <div className="title">
              <h3>{movie.title}</h3>
              <p>{selectedDate}</p>
            </div>
            <div className="sali">
              <p>{movie.TheatreAuditorium}</p>
            </div>
            <div className="time">
              <p>{movie.date}</p>
            </div>
            <div className="rating">
              <img src={movie.rating} alt="ratingimage" />
            </div>
          </div>
          <div className="nappi">
            <button
              onClick={() => {
                setTrigger(true);
                setTheatre(movie.TheatreAuditorium);
                setStartingTime(movie.showStart);
                setUrlToShow(movie.ShowURL);
                getGroups(userid);
                setEventId(movie.eventID);
              }}
            >
              Jaa näytös
            </button>
            <a href={movie.ShowURL}>
              <button>Valitse näytös</button>
            </a>
          </div>
        </div>
      ))}
      <Popup className="lisätieto" trigger={triggerState}>
        <h3>Jaa ryhmälle</h3>

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
        <button onClick={setGroupEvent}>Lähetä näytös</button>
        <button onClick={() => setTrigger(false)}>Sulje</button>
      </Popup>
    </div>
  );
}

export default Näytökset;
