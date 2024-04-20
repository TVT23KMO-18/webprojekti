import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RyhmänOmaSivu.css";

export default function RyhmänOmaSivu() {
  const [elokuvatSarjat, setElokuvatSarjat] = useState([]);
  const { idgroup, groupname } = useParams();
  const [arvostelut, setArvostelut] = useState([]);
  const [näytökset, setNäytökset] = useState([]);

  useEffect(() => {
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
      console.log(eventsData);
      const events = [];
      for (let i = 0; i < eventsData.length; i++) {
        const eventid = eventsData[i].eventid;
        const eventxmldata = await eventsxml(eventid);

        events.push(eventxmldata);
      }
      setNäytökset(events);
    } catch (error) {
      console.log("ei toimi");
    }
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
        throw new Error("Event element not found in XML data");
      }

      const titleElement = eventElement.querySelector("Title");
      const title = titleElement ? titleElement.textContent : null;

      const ratingElement = eventElement.querySelector("RatingImageUrl");
      const rating = ratingElement ? ratingElement.textContent : null;

      const imageUrlElement = eventElement.querySelector(
        "EventSmallImagePortrait"
      );
      const imageUrl = imageUrlElement ? imageUrlElement.textContent : null;

      const theatreAuditoriumElement = eventElement.querySelector(
        "TheatreAndAuditorium"
      );
      const theatreAuditorium = theatreAuditoriumElement
        ? theatreAuditoriumElement.textContent
        : null;

      const eventIdElement = eventElement.querySelector("ID");
      const eventId = eventIdElement ? eventIdElement.textContent : null;

      const eventUrlElement = eventElement.querySelector("EventURL");
      const eventUrl = eventUrlElement ? eventUrlElement.textContent : null;

      const eventData = {
        title,
        rating,
        imageUrl,
        theatreAuditorium,
        eventId,
        eventUrl,
      };

      return eventData;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  }

  return (
    <>
      <h1>{groupname}</h1>
      <p>{idgroup}</p>
      <div className="Ryhmänomansivuncontainer">
        <div className="ryhmällejaetutelokuvat">
          {elokuvatSarjat.map((sisältö, index) => (
            <div key={index} className="elokuvatdata">
              <p>{sisältö.userName}</p>
              <p>{sisältö.id}</p>
              <img
                src={`https://image.tmdb.org/t/p/w200${sisältö.movieImage}`}
                alt="kuvatossaja"
              />
            </div>
          ))}
        </div>
        <div className="jaetutarvostelut">
          <p>testings</p>
          {arvostelut.map((arvostelu, index) => (
            <div key={index} className="arvostelutdata">
              <img
                src={`https://image.tmdb.org/t/p/w200${arvostelu.movieImage}`}
                alt="kuvatossaja"
              />
              <p>{arvostelu.title}</p>
              <p>{arvostelu.arvosteluTeksti}</p>
            </div>
          ))}
        </div>
        <div className="jaetutnäytökset">
          <p>testings</p>
          {näytökset.map((näytös, index) => (
            <div key={index} className="arvostelutdata">
              <p>{näytös.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
