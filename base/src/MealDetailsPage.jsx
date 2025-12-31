// MealDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const MealDetailsPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const [mealDetails, setMealDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMealDetails(data.meals[0]));
  }, [id]);

  if (!mealDetails) return <p>Loading...</p>;

  return (
    <div className="details">
      <h3>{mealDetails.strMeal}</h3>
      <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
      <p>{mealDetails.strInstructions}</p>

      <div className="buttons">
        <button onClick={() => onAddToCart(mealDetails)} className="add-cart">
          Add to Cart
        </button>
        <button onClick={() => alert("Proceed to Buy")} className="buy-now">
          Buy Now
        </button>
      </div>

      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
};

export default MealDetailsPage;