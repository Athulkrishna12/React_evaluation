import React, { useState } from "react";
const Navbar = ({ cartCount, cartItems, onIncreaseQuantity, onDecreaseQuantity }) => {
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="navbar">
      <h2>Meal App</h2>
      <div className="cart" onClick={() => setShowCart(!showCart)}>
        🛒 Cart: {cartCount}
      </div>

      {showCart && (
        <div className="cart-dropdown">
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.idMeal}>
                  {item.strMeal} — Qty: {item.quantity}
                  <button onClick={() => onIncreaseQuantity(item.idMeal)}>➕</button>
                  <button onClick={() => onDecreaseQuantity(item.idMeal)}>➖</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;