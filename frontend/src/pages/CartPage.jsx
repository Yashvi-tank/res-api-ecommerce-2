import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "../styles/CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item._id} className="cart-item">
              <img
                src={item.imageUrl || "https://via.placeholder.com/100x100?text=No+Image"}
                alt={item.name}
              />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="cart-desc">{item.description}</p>
                <span className="cart-price">
                  ${Number(item.price).toFixed(2)}
                </span>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
