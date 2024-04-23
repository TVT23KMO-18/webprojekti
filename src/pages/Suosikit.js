import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Suosikit.css";
import { UserContext } from "../context/UserContext";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [shareableLink, setShareableLink] = useState("");
  const { userid } = useContext(UserContext); 
  const { userid: paramUserId } = useParams(); 

  useEffect(() => {
    const userIdToFetch = userid || paramUserId;
    if (userIdToFetch) {
      fetchFavorites(userIdToFetch);
    }
  }, [userid, paramUserId]);

  async function fetchFavorites(userId) {
    try {
      const response = await fetch(`http://localhost:3001/favorites/user/${userId}`);
      const data = await response.json();
      const favoritesData = [];

      for (let i = 0; i < data.length; i++) {
        const favorite = data[i];
        const { movieid, serieid } = favorite;
        let title = "";
        let movieImage = "";
        let overview = "";
        let studioName = "";
        let type = "";

        if (movieid != null) {
          const movieData = await movieDataFromId(movieid);
          title = movieData.title;
          movieImage = movieData.movieImage;
          overview = movieData.overview;
          studioName = movieData.studioName;
          type = "Movie";
        } else if (serieid != null) {
          const serieData = await serieDataFromId(serieid);
          title = serieData.title;
          movieImage = serieData.movieImage;
          overview = serieData.overview;
          studioName = serieData.studioName;
          type = "Series";
        }

        favoritesData.push({
          title,
          movieImage,
          overview,
          studioName,
          type,
        });
      }

      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }

  async function movieDataFromId(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const title = data.title;
      const movieImage = data.poster_path;
      const overview = data.overview;
      const studioName = data.production_companies.length > 0 ? data.production_companies[0].name : null;
      return { title, movieImage, overview, studioName };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function serieDataFromId(serieId) {
    const url = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const title = data.original_name;
      const movieImage = data.poster_path;
      const overview = data.overview;
      const studioName = data.production_companies.length > 0 ? data.production_companies[0].name : null;
      return { title, movieImage, overview, studioName };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  const generateShareableLink = async () => {
    try {
      const response = await fetch("http://localhost:3001/favorites/generateLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
        
      });
      const data = await response.json();
      setShareableLink(data.shareableLink);
    } catch (error) {
      console.error("Error generating shareable link:", error);
    }
  };

  return (
    <div className="favorites-container">
      <div className="title">
        <h1>Suosikki elokuvat ja sarjat</h1>
      </div>

      {favorites.map((favorite, index) => (
        <div key={index} className="favorite">
          {favorite.movieImage && (
            <div className="kuva">
              <img
                src={`https://image.tmdb.org/t/p/w200${favorite.movieImage}`}
                alt="media_image"
              />
            </div>
          )}
          <div className="details">
            <h3>{favorite.title}</h3>
            <p>Tyyppi: {favorite.type}</p>
            <p>Studion nimi: {favorite.studioName}</p>
            <p>{favorite.overview}</p>
          </div>
        </div>
      ))}

        {userid && (
        <div className="shareable-link">
          {shareableLink ? (
            <p>Jaettava linkki: {shareableLink}</p>
          ) : (
            <button onClick={generateShareableLink}>Luo jaettava linkki suosikeista</button>
          )}
        </div>
      )}
    </div>
  );
}