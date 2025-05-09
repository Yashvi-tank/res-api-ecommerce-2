
import React, { createContext, useState } from "react";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    // append rather than replace
    setCart((prev) => [...prev, item]);
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
