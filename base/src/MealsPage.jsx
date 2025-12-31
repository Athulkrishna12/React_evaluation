import React from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";


const MealsPage = () => {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals));
  }, [category]);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button">
        Back to Categories
      </button>
      <h2>{category} Meals</h2>
      <div className="food">
        {meals.map(meal => (
          <div key={meal.idMeal} className="card">
            <Link to={`/meal/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strMeal}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MealsPage;
