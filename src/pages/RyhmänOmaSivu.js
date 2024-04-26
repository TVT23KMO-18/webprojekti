import React, { useEffect, useState, useContext } from "react";
import { json, useParams } from "react-router-dom";
import "./RyhmänOmaSivu.css";
import StarRating from "./StarRating";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function RyhmänOmaSivu() {
  const { user } = useContext(UserContext);
  const [elokuvatSarjat, setElokuvatSarjat] = useState([]);
  const { idgroup, groupname } = useParams();
  const [arvostelut, setArvostelut] = useState([]);
  const [näytökset, setNäytökset] = useState([]);
  const [jäsenet, setJäsenet] = useState([]);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    async function getOwnerFromGroup() {
      try {
        const url = `http://localhost:3001/group/groupowner/${idgroup}`;
        const data = await fetch(url);
        const ownerData = await data.json();
        setOwner(ownerData);
      } catch (error) {
        console.log("ei");
      }
    }
    getOwnerFromGroup();
  }, []);

  useEffect(() => {
    console.log(owner);
  }, [owner]);

  useEffect(() => {
    async function getUsersFromGroup() {
      try {
        const url = `http://localhost:3001/group/users/${idgroup}`;
        const data = await fetch(url);
        const usersData = await data.json();
        setJäsenet(usersData);
        console.log(jäsenet);
      } catch (error) {
        console.log("ei");
      }
    }
    getUsersFromGroup();
  }, []);

  useEffect(() => {
    console.log(idgroup);
    async function fetchData(idgroup) {
      try {
        const url = `http://localhost:3001/groupmovies/movies/${idgroup}`;
        const data = await fetch(url);
        const moviesData = await data.json();
        const movies = [];

        for (let i = 0; i < moviesData.length; i++) {
          const moviedata = moviesData[i];
          const movieid = moviedata.movieid;
          const idUser = moviedata.iduser;
          const serieId = moviedata.serieid;
          let movieImage = "";
          let movieName = "";
          let id = null;

          const userName = await nameFromId(idUser);
          if (movieid != null) {
            const movieData = await fetchMovieData(movieid);
            movieImage = movieData.movieImage;
            movieName = movieData.movieName;
            id = movieid;
          } else {
            const serieData = await fetchSerieData(serieId);
            movieImage = serieData.movieImage;
            movieName = serieData.movieName;
            id = serieId;
          }

          movies.push({
            userName,
            id,
            movieImage,
            movieName,
          });
        }
        setElokuvatSarjat(movies);
        getEvents(idgroup);
      } catch (error) {
        console.error("Fetch error:", error);
      }
      async function fetchMovieData(movieid) {
        const url = `https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        const response = await fetch(url);
        const responseData = await response.json();
        const movieName = responseData.original_title;
        const movieImage = responseData.poster_path;

        return { movieName, movieImage };
      }
      async function fetchSerieData(serieId) {
        const url = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        const response = await fetch(url);
        const responseData = await response.json();
        //console.log(responseData);
        const movieName = responseData.original_title;
        const movieImage = responseData.poster_path;

        return { movieName, movieImage };
      }
    }

    async function fetchReviewsAndDetails(idgroup) {
      try {
        const arvosteluUrl = `http://localhost:3001/groupreviews/reviews/${idgroup}`;
        const arvosteluResponse = await fetch(arvosteluUrl);
        const arvosteluData = await arvosteluResponse.json();

        const arvostelut = [];
        for (const item of arvosteluData) {
          const arvosteluId = item.idreviews;
          const reviewUrl = `http://localhost:3001/reviews/reviewsbyid/${arvosteluId}`;
          const reviewResponse = await fetch(reviewUrl);
          const reviewData = await reviewResponse.json();

          const review = reviewData[0];
          if (review) {
            const idUser = review.iduser;
            const name = await nameFromId(idUser);

            const arvosteluTeksti = review.review_text;
            const arvosana = review.review_num;
            const movieId = review.movieid;
            let title = "";
            let movieImage = "";
            let type = "";
            let overview = "";
            let studioName = "";

            if (movieId != null) {
              const movieData = await movieNamePictureFromId(movieId);
              title = movieData.title;
              movieImage = movieData.movieImage;
              overview = movieData.overview;
              studioName = movieData.studioName;
              type = "Elokuva";
            } else {
              const serieId = review.serieid;
              const serieData = await serieNamePictureFromId(serieId);
              title = serieData.title;
              movieImage = serieData.movieImage;
              overview = serieData.overview;
              studioName = serieData.studioName;
              type = "Sarja";
            }

            arvostelut.push({
              idUser,
              name,
              arvosteluTeksti,
              arvosana,
              movieId,
              title,
              movieImage,
              overview,
              studioName,
              type,
            });
          }
        }

        setArvostelut(arvostelut);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData(idgroup);
    fetchReviewsAndDetails(idgroup);
  }, [idgroup]);

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
      // console.log(username);
      return username;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  async function movieNamePictureFromId(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const title = data.title;
      const movieImage = data.poster_path;
      const overview = data.overview;
      const studioName =
        data.production_companies.length > 0
          ? data.production_companies[0].name
          : null;

      return { title, movieImage, overview, studioName };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  async function serieNamePictureFromId(serieId) {
    const url = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const title = data.original_name;
      const movieImage = data.poster_path;
      const overview = data.overview;
      const studioName =
        data.production_companies.length > 0
          ? data.production_companies[0].name
          : null;

      return { title, movieImage, overview, studioName };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  async function getEvents() {
    try {
      const url = `http://localhost:3001/groupevents/${idgroup}`;
      const data = await fetch(url);
      const eventsData = await data.json();
      // console.log(eventsData);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hour = String(currentDate.getHours()).padStart(2, "0");
      const minute = String(currentDate.getMinutes()).padStart(2, "0");
      const second = String(currentDate.getSeconds()).padStart(2, "0");

      const currentTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      //console.log(currentTime);
      const events = [];
      for (let i = 0; i < eventsData.length; i++) {
        const eventid = eventsData[i].eventid;

        const eventStartingTime = eventsData[i].startingtime;
        if (eventStartingTime < currentTime) {
          console.log("menny jo tossaja");
          try {
            await fetch(`http://localhost:3001/groupevents/${eventid}`, {
              method: "DELETE",
            });
            console.log("Event deleted:", eventid);
          } catch (error) {
            console.error("Error deleting event:", eventid, error);
          }
        } else {
          const eventTheatre = eventsData[i].theatre;
          const eventUrtlToShow = eventsData[i].urltoshow;
          const eventxmldata = await eventsxml(eventid);
          const eventTitle = eventxmldata.title;
          const eventImageUrl = eventxmldata.imageUrl;
          // console.log(eventStartingTime);
          const eventRating = eventxmldata.rating;
          const formattedDate = formatStartingTime(eventStartingTime);

          events.push({
            eventTitle,
            formattedDate,
            eventTheatre,
            eventUrtlToShow,
            eventImageUrl,
            eventRating,
          });
        }
      }

      setNäytökset(events);
    } catch (error) {
      console.log("ei toimi");
    }
  }
  function formatStartingTime(startingTime) {
    const date = new Date(startingTime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}.${formattedMonth} ${formattedHours}.${formattedMinutes}`;
  }

  async function eventsxml(eventid) {
    const parser = new DOMParser();
    const url = `https://www.finnkino.fi/xml/Events/?eventID=${eventid}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch schedule. Status code: ${response.status}`
        );
      }

      const xmlData = await response.text();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      const eventElement = xmlDoc.querySelector("Event");

      if (!eventElement) {
        throw new Error("Event element not found");
      }

      const titleElement = eventElement.querySelector("Title");
      const title = titleElement ? titleElement.textContent : null;

      const ratingElement = eventElement.querySelector("RatingImageUrl");
      const rating = ratingElement ? ratingElement.textContent : null;

      const imageUrlElement = eventElement.querySelector(
        "EventMediumImagePortrait"
      );
      const imageUrl = imageUrlElement ? imageUrlElement.textContent : null;

      const eventIdElement = eventElement.querySelector("ID");

      const eventUrlElement = eventElement.querySelector("EventURL");

      const eventData = {
        title,
        rating,
        imageUrl,
      };

      return eventData;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  const deleteMember = async (jäsen, idgroup) => {
    if (jäsen != owner) {
      const data = {
        username: jäsen,
        idgroup: idgroup,
      };
      const jsonData = JSON.stringify(data);
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        console.log(jsonData);
        /*axios.delete("http://localhost:3001/group/deletebyusername", jsonData, options)*/
        axios.delete("http://localhost:3001/group/deletebyusername", {
          data: jsonData,
          ...options,
        });
      } catch (error) {
        console.log("Error");
      }
    } else {
      alert("Omistaja ei voi poistaa itseään");
    }
  };

  useEffect(() => {
    console.log(jäsenet);
  }, [jäsenet]);

  return (
    <div className="ryhmäbody">
      <h1>{groupname}</h1>
      <div className="Ryhmänomansivuncontainer">
        <h3>Elokuvat ja Sarjat</h3>
        <div className="ryhmällejaetutelokuvat">
          {elokuvatSarjat.map((sisältö, index) => (
            <div key={index} className="elokuvatdata">
              <img
                src={`https://image.tmdb.org/t/p/w200${sisältö.movieImage}`}
                alt="kuvatossaja"
              />
            </div>
          ))}
        </div>
        <h3>Arvostelut</h3>

        <div className="jaetutarvostelut">
          {arvostelut.map((arvostelu, index) => (
            <div key={index} className="arvostelutdata">
              <img
                src={`https://image.tmdb.org/t/p/w200${arvostelu.movieImage}`}
                alt="kuvatossaja"
              />
              <StarRating rating={arvostelu.arvosana} />
              <p>{arvostelu.title}</p>
              <div className="arvostelutteksti">
                <p>{arvostelu.arvosteluTeksti}</p>
              </div>
            </div>
          ))}
        </div>
        <h3>Näytökset</h3>
        <div className="jaetutnäytökset">
          {näytökset.map((näytös, index) => (
            <div key={index} className="arvostelutdata">
              <img src={näytös.eventImageUrl} alt={näytös.eventTitle} />
              <p>{näytös.eventTheatre}</p>
              <p>{näytös.formattedDate}</p>
              <a href={näytös.eventUrtlToShow}>
                <button>Valitse näytös</button>
              </a>
            </div>
          ))}
        </div>
        <div className="ryhmä-sivun-jäsenet">
          <h4>Ryhmän Jäsenet</h4>
          {jäsenet.map((jäsen, index) => (
            <div className="ryhmän-jäsenet" key={index}>
              <p>{jäsen}</p>
              {user.username === owner && (
                <button onClick={() => deleteMember(jäsen, idgroup)}>
                  Poista käyttäjä ryhmästä
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
