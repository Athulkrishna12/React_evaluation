import React from "react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(res => res.json())
      .then(data => setCategories(data.categories));
  }, []);

  return (
    <div>
      <h2>Meal Categories</h2>
      <div className="food">
        {categories.map(category => (
          <div key={category.idCategory} className="card">
            <Link to={`/meals/${category.strCategory}`}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <p>{category.strCategory}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;