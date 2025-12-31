// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
//       .then(res => res.json())
//       .then(data => setCategories(data.categories));
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="title">Meal Categories</h2>

//       <div className="food">
//         {categories.map(category => (
//           <div className="card" key={category.idCategory}>
//             <img
//               src={category.strCategoryThumb}
//               alt={category.strCategory}
//             />
//             <p>{category.strCategory}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App; 


// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [categories, setCategories] = useState([]);
//   const [meals, setMeals] = useState([]);
//   const [mealDetails, setMealDetails] = useState(null);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedMealId, setSelectedMealId] = useState("");

//   useEffect(() => {
//     fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
//       .then(res => res.json())
//       .then(data => setCategories(data.categories));
//   }, []);

//   useEffect(() => {
//     if (selectedCategory) {
//       fetch(
//         `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
//       )
//         .then(res => res.json())
//         .then(data => setMeals(data.meals));
//     }
//   }, [selectedCategory]);

//   useEffect(() => {
//     if (selectedMealId) {
//       fetch(
//         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`
//       )
//         .then(res => res.json())
//         .then(data => setMealDetails(data.meals[0]));
//     }
//   }, [selectedMealId]);

//   return (
//     <div className="container">
//       <h2 className="title">Meal Categories</h2>

//       {!selectedCategory && (
//         <div className="food">
//           {categories.map(category => (
//             <div
//       className="card"
//            key={category.idCategory}
//            onClick={() => setSelectedCategory(category.strCategory)}
//             >
//          <img
//        src={category.strCategoryThumb}
//          alt={category.strCategory}
//     />
//    <p>{category.strCategory}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* PAGE 2 – Meals */}
//       {selectedCategory && !selectedMealId && (
//         <div className="food">
//           {meals.map(meal => (
//             <div
//               className="card"
//               key={meal.idMeal}
//               onClick={() => setSelectedMealId(meal.idMeal)}
//             >
//               <img src={meal.strMealThumb} alt={meal.strMeal} />
//               <p>{meal.strMeal}</p>
//             </div>
//           ))}
//         </div>
//       )}
//       {mealDetails && (
//         <div className="details">
//           <h3>{mealDetails.strMeal}</h3>
//           <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
//           <p>{mealDetails.strInstructions}</p>
//           <button
//             onClick={() => {
//               setSelectedMealId("");
//               setMealDetails(null);
//             }}
//           >
//             Back
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;import React, { useState } from "react";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import CategoriesPage from "./CategoriesPage";
import MealsPage from "./MealsPage";
import MealDetailsPage from "./MealDetailsPage";
import Navbar from "./navbar"
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
const handleAddToCart = (meal) => {
  setCartItems(prevItems => {
    const exists = prevItems.some(item => item.idMeal === meal.idMeal);
    if (exists) {
      return prevItems; 
    }
    return [...prevItems, { ...meal, quantity: 1 }]; 
  });
};


  const handleIncreaseQuantity = (idMeal) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.idMeal === idMeal
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (idMeal) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.idMeal === idMeal
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <Router>
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        cartItems={cartItems}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/meals/:category" element={<MealsPage />} />
        <Route
          path="/meal/:id"
          element={<MealDetailsPage onAddToCart={handleAddToCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;