import React, { useEffect, useState } from "react";
import "./Arvostelut.css";
import Popup from "./Popup";

export default function Arvostelut() {
  const [arvostelut, setArvostelut] = useState([]);
  const [triggerState, setTrigger] = useState(false);
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");

  useEffect(() => {
    async function getRewieves() {
      try {
        const response = await fetch("http://localhost:3001/reviews");
        const arvostelut = await response.json();
        const ArvostelutData = [];
        for (let i = 0; i < arvostelut.length; i++) {
          const arvostelu = arvostelut[i];
          const idUser = arvostelu.iduser;
          const name = await nameFromId(idUser);

          const arvosteluTeksti = arvostelu.review_text;
          const arvosana = arvostelu.review_num;
          const movieId = arvostelu.movieid;
          let title = "";
          let movieImage = "";
          let type = "";
          let overview = "";
          if (movieId != null) {
            const movieData = await movieNamePictureFromId(movieId);
            title = movieData.title;
            movieImage = movieData.movieImage;
            overview = movieData.overview;
            type = "Elokuva";
          } else {
            const serieId = arvostelu.serieid;
            const movieData = await serieNamePictureFromId(serieId);
            title = movieData.title;
            movieImage = movieData.movieImage;
            overview = movieData.overview;
            type = "Sarja";
          }

          ArvostelutData.push({
            idUser,
            name,
            arvosteluTeksti,
            arvosana,
            movieId,
            title,
            movieImage,
            overview,
            type,
          });
        }
        setArvostelut(ArvostelutData);
      } catch (error) {
        console.log("Error Fetching data ", error);
      }
    }
    getRewieves();
  }, []);
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

      return { title, movieImage, overview };
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
      console.log(data);
      const title = data.original_name;
      const movieImage = data.poster_path;
      const overview = data.overview;

      return { title, movieImage, overview };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  return (
    <div className="arvostelutcontainer">
      <div className="Otsikko">
        <h1>Arvostelut</h1>
      </div>

      {arvostelut.map((arvostelu, index) => (
        <div key={index} className="arvostelut">
          {arvostelu.movieImage != null ? (
            <div className="kuva">
              <img
                src={`https://image.tmdb.org/t/p/w200${arvostelu.movieImage}`}
                alt="movie_image"
              />
            </div>
          ) : null}
          <div className="row">
            <h3>{arvostelu.name}</h3>
            <p>{arvostelu.title}</p>
            <p>{arvostelu.arvosana}</p>
            <p>{arvostelu.arvosteluTeksti}</p>
          </div>
          <div className="nappi">
            <button
              onClick={() => {
                setTrigger(true);
                setName(arvostelu.title);
                setOverview(arvostelu.overview);
              }}
            >
              Lisätiedot
            </button>
          </div>
        </div>
      ))}
      <Popup trigger={triggerState}>
        <p>{name}</p>
        <p>{overview}</p>
        <button onClick={() => setTrigger(false)}>Sulje</button>
      </Popup>
    </div>
  );
}
