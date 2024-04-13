import React from "react";
import "./StarRating.css"; // Import CSS file for styling

const StarRating = ({ rating }) => {
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="ratingstart">
            &#9733;
          </span>
        ); // Yellow star
      } else {
        stars.push(
          <span key={i} className="noratingstart">
            &#9734;
          </span>
        ); // White star
      }
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
