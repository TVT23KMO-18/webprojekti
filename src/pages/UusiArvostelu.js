import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./UusiArvostelu.css";
import { UserContext } from "../context/UserContext";

export default function UusiArvostelu() {
  const { mediaType, movieId, title } = useParams();
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const { userid, token } = useContext(UserContext);

  const handleChange = (e) => {
    setRating(e.target.value);
  };

  const textChange = (e) => {
    setText(e.target.value);
  };
  async function setReview() {
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
        "http://localhost:3001/reviews",
        {
          iduser: userid,
          review_text: text,
          review_num: rating,
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
      console.log("Arvostelu lisätty", response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h3>Uusi arvostelu</h3>
      <p>{mediaType}</p>
      <p>{movieId}</p>
      <p>{title}</p>

      <div>
        <label>Select Rating:</label>
        <select value={rating} onChange={handleChange}>
          <option value="">Select</option>
          {[...Array(5).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="textinput"
        type="text"
        alue={text}
        onChange={textChange}
      ></textarea>
      <div></div>
      <button onClick={setReview}>Lähetä arvostelu</button>
    </div>
  );
}
